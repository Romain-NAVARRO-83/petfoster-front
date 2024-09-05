export default function computeAge(dateOfBirth: string): string {
  const birthDate = new Date(dateOfBirth);
  const now = new Date();

  const yearsDifference = now.getFullYear() - birthDate.getFullYear();
  const monthsDifference = now.getMonth() - birthDate.getMonth();
  const daysDifference = now.getDate() - birthDate.getDate();

  // Ajuste l'âge si la date actuelle est avant l'anniversaire de cette année
  let ageInYears = yearsDifference;
  if (monthsDifference < 0 || (monthsDifference === 0 && daysDifference < 0)) {
    ageInYears--;
  }

  if (ageInYears > 0) {
    return `${ageInYears} ans`;
  } else {
    // Si l'âge est inférieur à un an, calcule les mois
    let ageInMonths = monthsDifference;
    if (daysDifference < 0) {
      ageInMonths--;
    }
    ageInMonths += (ageInYears * 12); // Ajuste les mois en cas d'âge proche de l'année
    
    return `${ageInMonths} mois`;
  }
}
