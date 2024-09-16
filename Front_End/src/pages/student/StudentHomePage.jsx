import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import Circular from '../../assets/img2.png';
import { styled } from 'styled-components';
import CountUp from 'react-countup';
import Fees from '../../assets/img4.png';
import { getCircular, getFees } from '../../redux/action/Student';
import { useNavigate } from 'react-router-dom';

const StudentHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [circularCount, setCircularCount] = useState(0);
  const [totalBalanceAmount, setTotalBalanceAmount] = useState(0); // State for total balance amount

  useEffect(() => {
    // Fetch and handle circular data
    dispatch(getCircular((res, err) => {
      if (res.statusCode === 200) {
        if (Array.isArray(res.data)) {
          setCircularCount(res.data.length);
        } else if (res.data && typeof res.data === 'object') {
          setCircularCount(1);
        }
      } else if (err) {
        console.log('Error Message:', err.message);
      } else {
        console.log('Error:', res);
      }
    }));

    // Fetch and handle fees data
    dispatch(getFees((res, err) => {
      if (res.statusCode === 200) {
        const rawData = res.data;
        let dataArray;

        if (Array.isArray(rawData)) {
          dataArray = rawData;
        } else if (typeof rawData === 'object') {
          dataArray = [rawData];
        } else {
          return;
        }

        // Sum up the balanceAmount
        const totalAmount = dataArray.reduce((acc, item) => acc + (item.balanceAmount || 0), 0);
        setTotalBalanceAmount(totalAmount); // Set the total balance amount
      } else {
        //console.log('Error Message:', err.message);
      } 
    }));
  }, [dispatch]);

  const handleCircularClick = () => {
    navigate('/student/circular'); 
  };
  const handleFeesClick = () => {
    navigate('/student/fees'); 
  };


  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 4, mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3}>
            <StyledPaper onClick={handleCircularClick}> 
              <img src={Circular} alt='Circular' />
              <Title>School Circular</Title>
              <Data start={0} end={circularCount} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <StyledPaper onClick={handleFeesClick}>
              <img src={Fees} alt='Fees' />
              <Title>Fees Amount</Title>
              <Data start={0} end={totalBalanceAmount} duration={2.5} prefix="₹" />
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 26px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 200px;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

export default StudentHomePage;
