import { useEffect, useState } from 'react';

export default function useGetCarData() {
  const [carList, setCarList] = useState([]);

  // 리스트 로딩 & 에러 처리
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:8080/carClasses');
        const response = await fetch('/api/db.json');

        const result = await response.json();

        // setCarList(result);
        setCarList(result.carClasses);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const timeout = setTimeout(fetchData, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { carList, isLoading, isError };
}
