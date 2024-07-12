import { Box, Button, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Card from '../../../Cards/Scrolls/Scrolling1'
 import { ScrollColors } from './colors'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { useGetProductsOfCategoryQuery } from '../../../redux/apis/ProductApis'

const ErrorSection = ({ isError, error }) => {
  const [, { language: lang }] = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
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
        {lang === 'en' ? 'Most Seller' : 'الاكثر مبيعا'}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          color: colors.buttonTextColor,
          // borderRadius: props.borderRaduisBtn ? '40px' : '0px',
          padding: { xs: '0.4rem 3rem', lg: '0.6rem 5rem' },
          border: `1px solid ${colors.buttonBorderColor} !important`,
          backgroundColor: 'transparent !important',
        }}
        onClick={() => {
          navigate('/departments')
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '10px', sm: '12px', md: '18px', lg: '22px' },
            // i need to make words not capital
            textTransform: 'capitalize',
          }}
        >
          {lang === 'en' ? 'View All' : 'عرض الكل'}
        </Typography>
      </Button>
    </Box>
  )
}

const Slider = ({ data, lang }) => {
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
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 120,
            },
            719: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            900: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {data?.map((item) => (
            <SwiperSlide key={item.title}>
              <Box sx={{ height: '400px', width: '100%' }} p={2}>
                <Card data={item} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Grid>
  )
}

const SimilarProduct = ({id}) => {
  const { data, isSuccess, isError, error } =
  useGetProductsOfCategoryQuery(id);
  console.log(data,id,'133data')
  const [, { language: lang }] = useTranslation()
  const { colors } = ScrollColors
  return (
    <Box
      mt={10}
      sx={{
        direction: lang === 'en' ? 'ltr' : 'rtl',
        bgcolor: colors.bgColor,
      }}
      my={data?.data !== undefined ? 5 : 0}
      py={data?.data !== undefined ? 3 : 0}
    >
      {isError && error && <ErrorSection error={error} isError={isError} />}
      {isSuccess && !isError && data?.data?.length > 0 && (
        <Grid container>
          {/* Newest title and btn */}
          <Grid
            item
            xs={12}
            md={3}
            p={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SliderHeader colors={colors} />
          </Grid>

          {/* Slider */}
          <Slider data={data?.data} lang={lang} />
        </Grid>
      )}
    </Box>
  )
}

export default SimilarProduct
