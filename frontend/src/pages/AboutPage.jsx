import { Box, Container, Text, Heading, Flex, VStack, HStack, Button } from '@chakra-ui/react'
import { GiPlasticDuck } from "react-icons/gi";

const AboutPage = () => {
  return (
    <Container maxW={"container.xl"} flexDirection={{ base: "column", lg: "row" }}>
        <VStack>
            <HStack>
                <Flex w="full" justifyContent="space-between" flexDirection={{ base: "column", lg: "row" }}>
                    <Box marginTop={10}>
                        <Box borderTop="8px solid black" maxW="80px" marginLeft={1}></Box>
                        <Heading fontWeight="semibold">
                            <Box>WHO WE ARE</Box> 
                        </Heading>
                        <Text marginLeft={10} marginTop={5} maxW="md" noOfLines={8}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin turpis vitae risus convallis, a volutpat justo lobortis. Quisque viverra sem erat, vel tincidunt urna dignissim ut. Fusce pharetra vulputate lorem, non gravida magna blandit et. Nulla facilisi. Integer euismod urna et sapien scelerisque, nec tempor mi laoreet. Morbi vehicula efficitur nisi, id euismod sem scelerisque sit amet. Cras eget sagittis augue. Etiam ac rhoncus felis. Ut vehicula malesuada dictum.

                            Nullam sit amet egestas felis. Integer fringilla nisl ut augue sodales varius. Etiam tincidunt quam vitae nisi auctor, eu pretium tortor faucibus. Aenean tempus feugiat dolor, ut convallis nulla tincidunt at. Sed efficitur, risus eu lobortis sollicitudin, ligula erat facilisis enim, a tempus magna ligula a libero. Pellentesque malesuada ipsum id mi aliquam, vitae lacinia libero vulputate. Suspendisse malesuada tortor leo, eget condimentum metus facilisis eu. Donec suscipit sapien nec lectus euismod, at efficitur libero iaculis. Ut tincidunt quam id nisl dapibus, a pharetra nisl pharetra.

                            Morbi condimentum interdum lectus, sed maximus eros vulputate id. Nam sollicitudin, erat ac lobortis mollis, leo ante tristique nisi, vel vehicula sapien libero at orci. Aenean aliquet tortor ut auctor convallis. Etiam maximus lacinia velit, id tempor augue aliquet ac. Fusce efficitur libero a risus cursus, vel lacinia odio pretium. Maecenas convallis enim vel metus tristique, eget tincidunt lorem posuere. Integer fringilla felis ac sapien varius, id luctus nunc aliquam.

                            Proin quis nulla quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet fermentum lorem. Curabitur vitae lorem eget libero euismod varius. Integer vestibulum auctor justo sit amet tincidunt. Ut iaculis ipsum vel gravida cursus. Sed nec libero quis sem condimentum facilisis. In facilisis lectus purus, vitae pharetra libero iaculis sed. Aliquam erat volutpat. Nam ac erat nec turpis vehicula auctor et ac ligula.
                        </Text>
                    </Box>
                    <Box>
                        <GiPlasticDuck fontSize="450px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                    </Box>
                </Flex>
            </HStack>
            <HStack>
                <Flex w="full" justifyContent="space-between" flexDirection={{ base: "column", lg: "row" }}>
                    <Box bg="#b8dadf" p={10}>
                        <Box borderTop="8px solid black" maxW="80px" marginLeft={1}></Box>
                        <Heading >ADVISOR</Heading>
                        <Box>
                            <GiPlasticDuck fontSize="150px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                        </Box>
                        <Heading as='h3' size='md'>Sed ut augue neque</Heading>
                        <Box maxW={"container.1xl"} paddingTop={5}>
                            <Text noOfLines={3}>Curabitur non purus eget orci consectetur facilisis. Ut feugiat, purus a sollicitudin facilisis, libero dui faucibus sapien, vitae varius ante erat vitae libero. Ut eget erat bibendum, tempor sapien a, posuere magna. In et viverra sapien. Donec ac tempor sapien. Aliquam feugiat ligula leo, vel dictum purus feugiat vitae. In at volutpat ex. Fusce volutpat cursus dui, eget tincidunt orci vehicula non. Maecenas vel placerat urna, nec auctor sem. Ut interdum tempor sapien sed convallis. Phasellus nec posuere lorem, in egestas lectus. Etiam pharetra vulputate justo, id consequat metus efficitur vel.</Text>
                        </Box>
                        <Button bg="blue.400" color="white" marginTop={5}>Learn More</Button>
                    </Box>
                    <Box bg="#c9e3e6" p={10}>
                        <Box borderTop="8px solid black" maxW="80px" marginLeft={1}></Box>
                        <Heading>PRESIDENT</Heading>
                        <Box>
                            <GiPlasticDuck fontSize="150px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                        </Box>
                        <Heading as='h3' size='md'>Sed ut augue neque</Heading>
                        <Box paddingTop={5}>
                            <Text noOfLines={3}>Curabitur non purus eget orci consectetur facilisis. Ut feugiat, purus a sollicitudin facilisis, libero dui faucibus sapien, vitae varius ante erat vitae libero. Ut eget erat bibendum, tempor sapien a, posuere magna. In et viverra sapien. Donec ac tempor sapien. Aliquam feugiat ligula leo, vel dictum purus feugiat vitae. In at volutpat ex. Fusce volutpat cursus dui, eget tincidunt orci vehicula non. Maecenas vel placerat urna, nec auctor sem. Ut interdum tempor sapien sed convallis. Phasellus nec posuere lorem, in egestas lectus. Etiam pharetra vulputate justo, id consequat metus efficitur vel.</Text>
                        </Box>
                        <Button bg="blue.400" color="white" marginTop={5}>Learn More</Button>
                    </Box>
                </Flex>
            </HStack>
        </VStack>
    </Container>
  )
}

export default AboutPage