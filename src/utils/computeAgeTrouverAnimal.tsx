export default function computeAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const now = new Date();

  const yearsDifference = now.getFullYear() - birthDate.getFullYear();
  const monthsDifference = now.getMonth() - birthDate.getMonth();
  const daysDifference = now.getDate() - birthDate.getDate();

  let ageInYears = yearsDifference;
  if (monthsDifference < 0 || (monthsDifference === 0 && daysDifference < 0)) {
    ageInYears--;
  }

  return ageInYears; // Retourne l'âge en années
}
