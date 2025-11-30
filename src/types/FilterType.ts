export type FilterType ='folder'|'pdf'|'doc'|'none';

//Record wygodny sposób na typowa mape
export const filterLabels: Record<Exclude<FilterType,'none'>,string> = {
    folder: "Foldery",
    pdf: "Pliki PDF",
    doc: "Dokumenty"
};