export const ChartData = (data, type) => {
  if (!data || !data[type]) {
    console.error(`Invalid data or type: data=${data}, type=${type}`);
    return [];
  }
  return data[type].map((item) => {
    return { Date: new Date(item[0]).toLocaleDateString(), [type]: item[1] };
  });
};
