import { Container, Grid, Paper } from '@mui/material'
import { useState, useEffect } from 'react';
import Circular from '../../assets/img2.png'
import {styled}  from 'styled-components'
import CountUp from 'react-countup';
import Fees from '../../assets/img4.png'
import Student from '../../assets/download.png'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getAllStudentDetails} from '../../redux/action/Student'
import {getAllFees} from '../../redux/action/admin'

 

const AdminHomePage = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [totalBalanceAmount, setTotalBalanceAmount] = useState(0); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllStudentDetails((res, err) => {
      if (res.statusCode===200) {
        if (Array.isArray(res.data)) {
          setStudentCount(res.data.length);
        } else if (res.data && typeof res.data === 'object') {
          setStudentCount(1);
        }else{

        }
      } else {
        
      }
    }));
    dispatch(getAllFees((res, err) => {
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
       //console.log(err);
      }
    }));
  }, [dispatch]);

  const handleStudentClick = () => {
    navigate('/admin/viewStudent'); 
  };
  const handleFeesClick = () => {
    navigate('/admin/fees'); 
  };
  const handleComplaintClick = () => {
    navigate('/admin/complain'); 
  };

  return (
    <>
    <Container maxWidth="lg" sx={{mb:4, mt:10}}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper onClick={handleStudentClick}>
                            <img src={Student} alt="Student"  style={{ maxHeight: '64px', maxWidth: '64px' }}  />
                            <Title>
                                Total Student
                            </Title>
                            <Data start={0} end={studentCount} duration={2.5} />
                        </StyledPaper>
                    </Grid>
        <Grid item xs={12} sm={3} md={3}>  
          <StyledPaper onClick = {handleComplaintClick}>
                  <img src={Circular} alt =' Circular js' />
                  <Title>Student Complaint</Title>
                  <Data start={0} end={15} duration={2.5} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
        <StyledPaper onClick={handleFeesClick}>
        <img src={Fees} alt ='Fees' />
                  <Title>Fees Amount</Title>
                  <Data start={0} end={totalBalanceAmount} duration={2.5} prefix="₹" />
        </StyledPaper>
        </Grid>
      </Grid>
    </Container>
    </>
  )
}


const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

const StyledPaper = styled(Paper)`
display:flex;
flex-direction:column;
padding:26px;
justify_content:space-between;
align-items:center;
text-align:center;
height:200px;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;


export default AdminHomePage