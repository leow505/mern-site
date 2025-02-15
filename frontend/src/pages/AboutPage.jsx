import { Box, Container, IconButton } from '@chakra-ui/react';
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from 'react';
import WhoWeAre from '../components/about/WhoWeAre';
import Leadership from '../components/about/Leadership';
import Officers from '../components/about/Officers';

const AboutPage = () => {
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box bg="#a2cfd4">
            {/* Section 1: Who We Are */}
            <Box minH="100vh" position="relative">
                <Container maxW="container.xl" h="full">
                    <WhoWeAre />
                </Container>
                <IconButton
                    icon={<IoIosArrowDown size="24px" />}
                    position="absolute"
                    bottom="5"
                    left="50%"
                    transform="translateX(-50%)"
                    borderRadius="full"
                    onClick={() => scrollToSection(section2Ref)}
                    _hover={{ bg: 'gray.200' }}
                    aria-label="Scroll to next section"
                />
            </Box>

            {/* Section 2: Leadership */}
            <Box ref={section2Ref} minH="100vh" position="relative">
                <Container maxW="container.xl" h="full" pt={20}>
                    <Leadership />
                </Container>
                <IconButton
                    icon={<IoIosArrowDown size="24px" />}
                    position="absolute"
                    bottom="5"
                    left="50%"
                    transform="translateX(-50%)"
                    borderRadius="full"
                    onClick={() => scrollToSection(section3Ref)}
                    _hover={{ bg: 'gray.200' }}
                    aria-label="Scroll to next section"
                />
            </Box>

            {/* Section 3: Officers */}
            <Box ref={section3Ref} minH="100vh" position="relative" bg="#8cbdc2">
                <Container maxW="container.xl" h="full" pt={20}>
                    <Officers />
                </Container>
            </Box>
        </Box>
    );
};

export default AboutPage;