export interface IFilter {
  [key: string]: any;
}

export const transformFilter = (filter: IFilter) => {
  const arr = Object.entries(filter);
  let params: string[] = [];
  for (let item of arr) {
    params.push(`${item[0]}=${item[1]}`);
  }
  return params.join('&');
};
