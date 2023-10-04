import { Box } from '@chakra-ui/react'

const Rightbar = () => {
  return (
    <Box
      w={'30%'}
      direction={'column'}
      className="sticky top-0 h-[100vh] hidden lg:block"
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio laboriosam
        cumque tempore ullam aperiam esse ab, consequatur accusamus nihil harum
        recusandae nostrum nam vitae eveniet deserunt sapiente ducimus
        consectetur obcaecati?
      </div>
    </Box>
  )
}

export default Rightbar
