export const deleteRecentItems = (vault) => {
  let recentItems = JSON.parse(localStorage.getItem("recentItems"));
  localStorage.setItem(
    "recentItems",
    JSON.stringify(
      recentItems.filter((recent) => recent.name !== vault.vaultName)
    )
  );
};
