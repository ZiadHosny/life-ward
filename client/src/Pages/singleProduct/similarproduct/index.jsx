import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ScrollColors } from './colors'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
  import { useEffect } from 'react'
import { useState } from 'react'
// import Card from '../noon1/NewCard'
import { useLazyGetProductsOfCategoryQuery } from '../../../APIs/ProductApis'
import DepartmentProduct from '../../departments/DepartmentProduct'

const ErrorSection = ({ isError, error }) => {
  const [, { language: lang }] = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       }}
    >
      <Typography
        fontSize={'1.5rem'}
        my={10}
        textAlign={'center'}
        color="error"
      >
        {isError
          ? error?.data && error?.data[`error_${lang}`]
          : error?.data && error?.data[`error_${lang}`]}
      </Typography>
    </Box>
  )
}

const SliderHeader = ({ colors }) => {
  const [, { language: lang }] = useTranslation()
  const navigate = useNavigate()
  return (
    <Box sx={{ textAlign: lang === 'en' ? 'start' : 'end' }}>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.8rem', lg: '2.7rem' },
          color: colors.title,
        }}
      >
        {lang === 'en' ? 'similar products' : 'المنتجات المتشابهه'}
      </Typography>
     
    </Box>
  )
}

const Slider = ({ data, lang,productid }) => {
  console.log(productid)
   return (
    <Grid
      width={'100%'}
      item
      xs={12}
      md={9}
      py={4}
      sx={{
        direction: lang === 'en' ? 'ltr' : 'rtl',
      }}
    >
      <Box px={2}>
        <Swiper
          style={{ direction: 'ltr' }}
          className="mySwiper"
          slidesPerView={4}
           freeMode={true}
          modules={[FreeMode]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 1,
            },
            719: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            900: {
              slidesPerView:3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 3.8,
              spaceBetween: 10,
            },
          }}
        >
          {data?.filter(item=>item?.id!==productid).map((item) => {
            console.log(item,'item')

return(
  <SwiperSlide key={item.title}>
    <Box sx={{   display:'flex',justifyContent:'center' ,
  
  // "& img":{
  //   height: { xs: '210px', sm: '320px', md: '400px',
  //   lg:'450px',xl:'500px' },
  // }
  
  width:'100%',
  ".most-selling-slider":{
    width:'100% !important'
  }
  }} >
    {/* <Card item={item}></Card> */}
    <DepartmentProduct item={item} key={item.title} />

     </Box>
  </SwiperSlide>
)
          })}
        </Swiper>
      </Box>
    </Grid>
  )
}

const Similarproduct = ({id,productId=''}) => {
console.log(productId)
    const [data,setData] = useState ({});
    
  const [getSimilarProducts,{ isSuccess, isError, error} ] =
  useLazyGetProductsOfCategoryQuery();
  useEffect(()=>{
    console.log(id)
    id&& getSimilarProducts(id).unwrap().then(res=>{
        console.log(res,)
        setData(res.data)}).catch(err=>console.log(err))
  },[id])
   const [, { language: lang }] = useTranslation()
  const { colors } = ScrollColors
  return (
<>
 {

      data?.length>1?
      <Box
      mt={10}
      sx={{
        direction: lang === 'en' ? 'ltr' : 'rtl',
        height:'100%',
       }}
      my={data?.data !== undefined ? 5 : 0}
      py={data?.data !== undefined ? 3 : 0}
    >
      {isError && error && <ErrorSection error={error} isError={isError} />}
      {isSuccess && !isError && data?.length > 0 ? (

      <>
      
      <Stack>

<Typography

sx={{
  fontSize:'30px',
  fontWeight:'bold',
  textAlign:'center',
  margin:{
    xs:'10px auto',
    sm:'14px auto',
    md:'40px auto'
  },
  fontSize:{
    xs:'16px',
    sm:'14px',
    md:'30px'
  },
  textTransform:'uppercase',
  color:'#693096'
}}

component={'h3'}>
  {lang==="en"?"You may also like":"يمكن ان يعجبك ايضا"}
</Typography>




<Stack sx={{
display:'flex',
alignItems:'center',
justifyContent:'center'
}}>
</Stack>



</Stack>
        <Grid  
        
        sx={{
          justifyContent:'center',
          height:'100%'
        }}>
        
          {/* Newest title and btn */}
      

          {/* Slider */}
           <Slider data={data.filter(pId=>pId.id!==productId)}
           
           productid={productId} lang={lang} />
        </Grid>
      </>
      ):null}
    </Box>
      :null
    }</>

  )
}

export default Similarproduct
