function Longest_Country_Name(country_list) {
  let longest = "";

  for (let i = 0; i < country_list.length; i++) {
    if (country_list[i].length > longest.length) {
      longest = country_list[i];
    }
  }

  return longest;
}

console.log(Longest_Country_Name(["Australia", "Germany", "United States of America"]));
