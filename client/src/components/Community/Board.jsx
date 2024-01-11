/* eslint-disable camelcase */
import moment from 'moment';
import React, { useEffect } from 'react';

const Board = ({ user_id, title, nickname, category, view_cnt, like_cnt, created_at, contents, Image }) => {
  useEffect(() => {
    // console.log('Board 컴포넌트가 마운트되었습니다.');
    // console.log(title);
    // console.log(nickname);
    // console.log(category);
    // console.log(view_cnt);
    // console.log(created_at);
    // console.log(contents);
    // console.log(Image);
  }, [user_id, title, nickname, category, view_cnt, like_cnt, created_at, contents, Image]); // 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 설정

  // 카테고리 값을 변경해주는 함수 / 노드(숫자) -> 프론트(한글)
  const getCategoryString = categoryNumber => {
    switch (category) {
      case 1:
        return '공지';
      case 2:
        return '자유';
      case 3:
        return '문의';
      default:
        return '자유';
    }
  };
  const categoryString = getCategoryString(category);

  return (
    // className="card mb-4"
    // className="container mt-3"
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-9">
          <article>
            <header className="mb-4">
              <h1 className="fw-bolder mb-3">{title}</h1>
              <div className="text-muted fst-italic mb-2">
                <div>
                  <h5>작성자: {nickname || '사용자 없음'}</h5>
                </div>
                카테고리: {categoryString} / 게시일: {moment(created_at).format('YYYY-MM-DD HH:mm:ss')} / 조회수:{' '}
                {view_cnt} / 좋아요 {like_cnt}
              </div>
            </header>
            {/* 이미지가 존재할 때만 렌더링 */}
            {Image && (
              <figure className="mb-4">
                <img className="img-fluid rounded" src={Image} alt="이미지 없음" />
              </figure>
            )}

            <section className="mb-5" style={{ minHeight: '100px', height: 'auto', overflow: 'hidden' }}>
              <p className="fs-5 mb-4" style={{ overflowY: 'auto' }}>
                {contents || '내용 없음'}
              </p>
            </section>
          </article>
          <div className="card-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Board;
