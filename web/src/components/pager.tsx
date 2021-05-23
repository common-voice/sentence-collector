import React from 'react';

type Props = {
  page: number
  lastPage: number
  onPage: (pageNumber: number) => void
}

export default function Pager({ page, lastPage, onPage }: Props) {
  return (
    <section className="pager-container">{
      [
        [0, '1'],
        [page - 1, '<'],
        [page, page + 1],
        [page + 1, '>'],
        [lastPage, lastPage + 1],
      ].map(([ pageNumber, text ]: [number, string | number], index) => (
        <span key={`idx${index+1}`}>{
          (pageNumber >= 0 && pageNumber <= lastPage) ? (
            <button
              className={page === pageNumber ? 'active pager standalone' : 'pager standalone'}
              onClick={(event) => {
                event.preventDefault();
                onPage && onPage(pageNumber);
              }} key={`page-link-${pageNumber}`}>
              {text}
            </button>
          ) : (
            <button key={`page-link-${pageNumber}`} className="active pager standalone">{text}</button>
          )
        }</span>
      ))
    }</section>
  );
}
