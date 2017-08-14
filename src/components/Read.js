import React from 'react';

const Read = () => {
  return (
    <div>
      <h2>Read</h2>
        <div id="read" className="card">
          <div className="card-header">
            <h4 className="card-title">이 부분은 제목입니다.</h4>
            <h6 className="card-subtitle mb-2 text-muted">no.1 | writer: chris | created: now | modified: now | view: 100</h6>
          </div>
          <div className="card-body">
            <p className="card-text">오늘 저녁 이 좁다란 방의 흰 바람벽에 어쩐지 쓸쓸한 것만이 오고 간다.
              <br />이 흰 바람벽엔 희미한 십오촉(十五燭) 전등이 지치운 불빛을 내어던지고 다 낡은 무명샷쯔가 어두운 그림자를 쉬이고 그리고 또 달디단 따끈한 감주나 한잔 먹고 싶다고 생각하는 내 가지가지 외로운 생각이 헤매인다.
            </p>
            <a href="#" className="btn btn-primary mr-1">목록</a>
            <a href="#" className="btn btn-primary mr-1">수정</a>
            <a href="#" className="btn btn-primary">삭제</a>
          </div>
          <div className="card-footer">
            <div>댓글 영역</div>
          </div>
        </div>
    </div>

  );
};

export default Read;
