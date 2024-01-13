import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';
import { loginState } from '@recoils/login';
import { CommunitysearchKeywordState } from '@recoils/Community';

// 카테고리 번호를 받아와 해당 카테고리 이름을 반환하는 함수
const getCategoryName = categoryNumber => {
  // 카테고리 번호에 따라 카테고리 이름 반환
  switch (categoryNumber) {
    case 1:
      return '공지';
    case 2:
      return '자유';
    case 3:
      return '문의';
    default:
      return '기타';
  }
};

// 커뮤니티 게시판 컴포넌트
const CommunityBoard = () => {
  const navigate = useNavigate();
  const loginUser = useRecoilValue(loginState);

  if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

  const searchKeyword = useRecoilValue(CommunitysearchKeywordState);
  const [allPosts, setAllPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get('http://heallenges.cafe24app.com/community');
        // Ensure that the server response has the expected structure
        const data = response.data.data || [];
        setAllPosts(data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    getAllPosts();
  }, []);

  const handleCategoryChange = category => {
    setCurrentPage(1);
    setSelectedCategory(category === 'all' ? 'all' : parseInt(category));
  };

  const filteredBoardList = allPosts;
  // .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
  // .filter(data => {
  //   const title = data?.title;
  //   return typeof title === 'string' && title.toLowerCase().includes(searchKeyword.toLowerCase());
  // });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = Math.max(0, indexOfLastPost - postsPerPage);
  const currentPosts = filteredBoardList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = pageNumber => {
    const newPageNumber = Math.min(Math.max(1, pageNumber), Math.ceil(filteredBoardList.length / postsPerPage));
    setCurrentPage(newPageNumber);
  };

  return (
    <div className="card mb-4">
      <div className="mt-3">
        <h3>&nbsp;게시판 목록</h3>
        <div className="mb-2 d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange('all')}>
            전체
          </button>
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(1)}>
            공지
          </button>
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(2)}>
            자유
          </button>
          <button className="btn btn-outline-secondary me-1" onClick={() => handleCategoryChange(3)}>
            문의
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">카테고리</th>
            <th scope="col">제목</th>
            <th scope="col">글쓴이</th>
            <th scope="col">게시일</th>
            <th scope="col">좋아요</th>
            <th scope="col">조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <th scope="row">{indexOfFirstPost + index + 1}</th>
              <td>{getCategoryName(post.category)}</td>
              <td>
                <Link to={`/community/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.nickname}</td>
              <td>{moment(post.created_at).format('YYYY-MM-DD')}</td>
              <td>{post.like_cnt}</td>
              <td>{post.view_cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="d-flex justify-content-center">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={filteredBoardList.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </nav>
    </div>
  );
};

export default CommunityBoard;
