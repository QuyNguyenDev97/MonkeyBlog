export default function useUpperFirstLetter() {
  const handleValues = (values) => {
    return values.charAt(0).toUpperCase() + values.slice(1).toLowerCase();
  };
  return { handleValues };
}
