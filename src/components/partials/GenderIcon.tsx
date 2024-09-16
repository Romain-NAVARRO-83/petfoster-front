interface GenderIconProps {
  gender: string;
  size: number;
}

export default function GenderIcon({ gender, size }: GenderIconProps) {
  return (
    <>
      {gender === "F" ? (
        <img src="/img/vector/femelle.svg" width={size} height={size} alt="Femelle" />
      ) : (
        <img src="/img/vector/male.svg" width={size} height={size} alt="Mâle" />
      )}
    </>
  );
}
