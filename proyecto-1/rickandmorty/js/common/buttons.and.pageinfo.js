const updateButtons = (currentPage, totalPages, prevButton, nextButton) => {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
};

const updatePageInfo = (currentPage, totalPages, pageInfo) => {
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
};

export { updateButtons, updatePageInfo };
