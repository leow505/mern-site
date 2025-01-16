import { useEffect, useState } from "react";
import { Box, Text, Button } from '@chakra-ui/react';

//temp just to show slideshow working correctly
const slides = [
    {
        image:"https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
        name:"Current event name",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        image:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D",
        name: "Another Event",
    description: "This is the description of another event.",
    },
    {
        image:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHRlY2h8ZW58MHx8MHx8fDA%3D",
        name: "Third Event",
    description: "Here is some text for the third event slide.",
    },
];

const Slideshow = () => {
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    }

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    },);

    const currentSlide = slides[currentIndex];

    return(
        <Box
            w="full"
            borderRadius="md"
            overflow="hidden"
            position="relative"
            bg="gray.800"
        >
      {/* Slide Content */}
            <Box
                h={{ base: "md", md: "2xl" }}
                bgImage={`url(${currentSlide.image})`}
                bgSize="cover"
                bgPosition="center"
                transition="all 0.5s ease-in-out"
            >
                <Box
                    position="absolute"
                    bottom="0"
                    w="full"
                    bg="rgba(70, 69, 69, 0.6)"
                    color="white"
                    p="4"
                >
                    <Text fontSize="xl" fontWeight="bold">
                        {currentSlide.name}
                    </Text>
                    <Text fontSize="md" mt="2">
                        {currentSlide.description}
                    </Text>
                    <Button mt="4" bg="black" variant="solid" color="white" _hover={{
                    color: "#f9ac00", bg:"gray"
                }}>
                        View Details
                    </Button>
                </Box>
            </Box>

      {/* Navigation Buttons */}
      <Box
        position="absolute"
        top="0"
        right="0"
        display="flex"
        gap="8px"
        bg="gray"
        borderRadius="md"
        opacity="0.8"
        p={3}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            w="20px"
            h="20px"
            borderRadius="full"
            bg="transparent"
            border={`4px solid ${index === currentIndex ? "white" : "black"}`}
            cursor="pointer"
            onClick={() => goToSlide(index)}
            margin={1}
          />
        ))}
      </Box>
    </Box>
    )
}

export default Slideshow