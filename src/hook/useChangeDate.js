export default function useChangeDate() {
  const changeDate = (data) => {
    const date = new Date(data * 1000);
    const formatDate = new Date(date).toLocaleDateString("vi-VI");
    return formatDate;
  };
  return { changeDate };
}
