import React from 'react';

const Loading: React.FC = () => {
  return (
    <section className='loading-wrap'>
      <p>
        데이터를 불러오는 중입니다. <br />
        잠시만 기다려 주세요. <span>💿</span>
      </p>
    </section>
  );
};

export default Loading;
