const myHeaders = new Headers();
myHeaders.append("apikey", "GNhvW1n9MdLIwe8EWuBXKw2LdLQDiFe6");

const headers: RequestInit = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export { headers };
