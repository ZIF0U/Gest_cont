import jsPDF from 'jspdf'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Contract {
  id: number
  carte_nationale: string
  nom_prenom: string
  date_naissance: string
  lieu_naissance?: string
  adresse?: string
  fonction: string
  date_recrutement?: string
  debut_contrat: string
  fin_contrat: string
  salaire_base?: number
  num_assurance_sociale?: string
  renewal_count?: number
  original_contract_id?: number
  is_renewal?: boolean
}

export const exportContractToPDF = (contract: Contract) => {
  const doc = new jsPDF()
  
  // Set font for Arabic/French text
  doc.setFont('helvetica')
  
  // Company Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('SARL GROUPE CMMC', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Z.I OULED SALAH EMIR ABDELKADER W. JIJEL', 105, 30, { align: 'center' })
  
  // Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('CONTRAT DE TRAVAIL', 105, 45, { align: 'center' })
  
  // Contract Number
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`N° Contrat: ${contract.id}`, 20, 60)
  
  // Date
  const currentDate = format(new Date(), "dd/MM/yyyy", { locale: fr })
  doc.text(`Date: ${currentDate}`, 20, 70)
  
  // Employee Information Section
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('INFORMATIONS DE L\'EMPLOYÉ', 20, 85)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  let yPosition = 95
  
  // Employee details
  doc.text(`Nom et Prénom: ${contract.nom_prenom}`, 20, yPosition)
  yPosition += 8
  
  doc.text(`Carte Nationale: ${contract.carte_nationale}`, 20, yPosition)
  yPosition += 8
  
  doc.text(`Date de Naissance: ${format(new Date(contract.date_naissance), "dd/MM/yyyy", { locale: fr })}`, 20, yPosition)
  yPosition += 8
  
  if (contract.lieu_naissance) {
    doc.text(`Lieu de Naissance: ${contract.lieu_naissance}`, 20, yPosition)
    yPosition += 8
  }
  
  if (contract.adresse) {
    doc.text(`Adresse: ${contract.adresse}`, 20, yPosition)
    yPosition += 8
  }
  
  // Contract Information Section
  yPosition += 5
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('INFORMATIONS DU CONTRAT', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  doc.text(`Fonction: ${contract.fonction}`, 20, yPosition)
  yPosition += 8
  
  if (contract.date_recrutement) {
    doc.text(`Date de Recrutement: ${format(new Date(contract.date_recrutement), "dd/MM/yyyy", { locale: fr })}`, 20, yPosition)
    yPosition += 8
  }
  
  doc.text(`Début de Contrat: ${format(new Date(contract.debut_contrat), "dd/MM/yyyy", { locale: fr })}`, 20, yPosition)
  yPosition += 8
  
  doc.text(`Fin de Contrat: ${format(new Date(contract.fin_contrat), "dd/MM/yyyy", { locale: fr })}`, 20, yPosition)
  yPosition += 8
  
  if (contract.salaire_base) {
    doc.text(`Salaire de Base: ${contract.salaire_base.toLocaleString()} DA`, 20, yPosition)
    yPosition += 8
  }
  
  if (contract.num_assurance_sociale) {
    doc.text(`Numéro d'Assurance Sociale: ${contract.num_assurance_sociale}`, 20, yPosition)
    yPosition += 8
  }
  
  // Renewal Information
  if (contract.renewal_count && contract.renewal_count > 0) {
    yPosition += 5
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(`Nombre de Renouvellements: ${contract.renewal_count}`, 20, yPosition)
    yPosition += 8
  }
  
  if (contract.is_renewal) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Ce contrat est un renouvellement', 20, yPosition)
    yPosition += 8
  }
  
  // Contract Terms (Generic)
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('CONDITIONS DU CONTRAT', 20, yPosition)
  
  yPosition += 10
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  
  const terms = [
    '1. L\'employé s\'engage à respecter les horaires de travail établis par l\'entreprise.',
    '2. L\'employé doit respecter les règles de sécurité et d\'hygiène en vigueur.',
    '3. Toute modification du contrat doit faire l\'objet d\'un avenant écrit.',
    '4. Le contrat peut être résilié selon les dispositions du code du travail.',
    '5. L\'employé bénéficie des congés payés selon la législation en vigueur.'
  ]
  
  terms.forEach(term => {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }
    doc.text(term, 20, yPosition)
    yPosition += 6
  })
  
  // Signature Section
  if (yPosition > 220) {
    doc.addPage()
    yPosition = 20
  }
  
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('SIGNATURES', 20, yPosition)
  
  yPosition += 15
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  // Employer signature
  doc.text('Signature de l\'employeur:', 20, yPosition)
  doc.line(20, yPosition + 2, 80, yPosition + 2)
  doc.text('SARL GROUPE CMMC', 20, yPosition + 8)
  
  // Employee signature
  doc.text('Signature de l\'employé:', 120, yPosition)
  doc.line(120, yPosition + 2, 180, yPosition + 2)
  doc.text(contract.nom_prenom, 120, yPosition + 8)
  
  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text(`Page ${i} sur ${pageCount}`, 105, 290, { align: 'center' })
  }
  
  // Generate filename
  const filename = `contrat_${contract.nom_prenom.replace(/\s+/g, '_')}_${format(new Date(), "yyyy-MM-dd")}.pdf`
  
  // Save the PDF
  doc.save(filename)
} 