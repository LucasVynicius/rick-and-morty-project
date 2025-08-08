import type { IInfo } from "../../Types/api";


interface PaginationProps{
    info: IInfo | null;
    currentPage: number;
    onPageChange: (url: string) => void;
}

export const Pagination = ({info, currentPage, onPageChange}: PaginationProps) => {
    if(!info) return null;

    return(
        <div className="pagination">
            <button disabled={!info.prev} onClick={() => onPageChange(info.prev!)}>
                Anterior
            </button>
            <span>Página {currentPage} de {info.pages}</span>
            <button disabled={!info.next} onClick={() => onPageChange(info.next!)}>
                Próximo
            </button>
        </div>
    )
}