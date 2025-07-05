// Simulation d'une base de données SQLite pour la démo
// Dans une vraie application Electron, vous utiliseriez sqlite3 ou better-sqlite3

interface Contract {
  id?: number
  carte_nationale: string
  nom_prenom: string
  date_naissance: string
  lieu_naissance?: string
  adresse?: string
  fonction: string
  date_recrutement?: string
  debut_contrat: string
  fin_contrat: string
  salaire_base?: number | null
  num_assurance_sociale?: string
  renewal_count?: number
  original_contract_id?: number
  is_renewal?: boolean
  is_replaced?: boolean
}

// Simulation du stockage local
const STORAGE_KEY = "contracts_data"

const getStoredContracts = (): Contract[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveContracts = (contracts: Contract[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts))
}

export const getContracts = async (): Promise<Contract[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const contracts = getStoredContracts()
  // Filter out replaced contracts, only show active ones
  return contracts.filter((contract) => !contract.is_replaced)
}

export const createContract = async (contractData: Omit<Contract, "id">): Promise<Contract> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const contracts = getStoredContracts()
  const newContract = {
    ...contractData,
    id: Date.now(), // Simple ID generation
  }

  contracts.push(newContract)
  saveContracts(contracts)

  return newContract
}

export const deleteContract = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const contracts = getStoredContracts()
  const filteredContracts = contracts.filter((contract) => contract.id !== id)
  saveContracts(filteredContracts)
}

export const updateContract = async (id: number, contractData: Partial<Contract>): Promise<Contract> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const contracts = getStoredContracts()
  const contractIndex = contracts.findIndex((contract) => contract.id === id)

  if (contractIndex === -1) {
    throw new Error("Contract not found")
  }

  const updatedContract = {
    ...contracts[contractIndex],
    ...contractData,
    id, // Ensure ID remains the same
  }

  contracts[contractIndex] = updatedContract
  saveContracts(contracts)

  return updatedContract
}

export const renewContract = async (
  contractId: number,
  renewalData: {
    salaire_base?: number | null
    debut_contrat: string
    fin_contrat: string
  },
): Promise<Contract> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const contracts = getStoredContracts()
  const originalContract = contracts.find((contract) => contract.id === contractId)

  if (!originalContract) {
    throw new Error("Contract not found")
  }

  // Create renewed contract with updated fields
  const renewedContract = {
    ...originalContract,
    id: Date.now(), // New ID for renewed contract
    salaire_base: renewalData.salaire_base,
    debut_contrat: renewalData.debut_contrat,
    fin_contrat: renewalData.fin_contrat,
    renewal_count: (originalContract.renewal_count || 0) + 1,
    original_contract_id: originalContract.original_contract_id || originalContract.id,
    is_renewal: true,
  }

  // Mark original contract as expired/replaced
  const updatedContracts = contracts.map((contract) =>
    contract.id === contractId ? { ...contract, is_replaced: true } : contract,
  )

  updatedContracts.push(renewedContract)
  saveContracts(updatedContracts)

  return renewedContract
}

// Helper function to get the latest contract for each person
const getLatestContracts = (contracts: Contract[]): Contract[] => {
  const contractMap = new Map<string, Contract>()
  
  contracts.forEach((contract) => {
    const key = contract.carte_nationale // Use carte_nationale as unique identifier
    const existing = contractMap.get(key)
    
    if (!existing) {
      contractMap.set(key, contract)
    } else {
      // Keep the contract with the latest end date
      const existingEndDate = new Date(existing.fin_contrat)
      const currentEndDate = new Date(contract.fin_contrat)
      
      if (currentEndDate > existingEndDate) {
        contractMap.set(key, contract)
      }
    }
  })
  
  return Array.from(contractMap.values())
}

export const getExpiredContracts = async (): Promise<Contract[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const contracts = getStoredContracts()
  const today = new Date()

  // Get all contracts, filter out replaced ones, get latest for each person, then filter expired
  const activeContracts = contracts.filter((contract) => !contract.is_replaced)
  const latestContracts = getLatestContracts(activeContracts)
  
  return latestContracts.filter((contract) => new Date(contract.fin_contrat) < today)
}

export const searchContracts = async (searchTerm: string): Promise<Contract[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const contracts = getStoredContracts()
  const term = searchTerm.toLowerCase()

  // Get all contracts, filter out replaced ones, get latest for each person, then filter by search term
  const activeContracts = contracts.filter((contract) => !contract.is_replaced)
  const latestContracts = getLatestContracts(activeContracts)
  
  return latestContracts.filter(
    (contract) =>
      contract.nom_prenom.toLowerCase().includes(term) ||
      contract.fonction.toLowerCase().includes(term) ||
      contract.carte_nationale.toLowerCase().includes(term),
  )
}
