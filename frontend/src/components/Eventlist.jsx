import { Box, VStack, Flex, HStack, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

const Eventlist = ( {event} ) =>{

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack w="full">
            <Flex gap={10} p={5} w="full" justifyContent="space-between">
                <HStack>
                    <Box>{new Date(event.date).toLocaleDateString()}</Box>
                    <Box>{event.name}</Box>
                </HStack>
                <HStack>
                <Box><Button onClick={onOpen}>View Details</Button></Box>
                </HStack>
            </Flex>
            <Box>
                <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{event.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>Description: {event.description || 'No description available.'}</Box>
                            <Box>Location: {event.location}</Box>
                            <Box>Time: {new Date(event.date).toLocaleTimeString()}</Box>
                        </ModalBody>
                        <ModalFooter gap={5}>
                            <Button bg="blue" color="white">Add To Calendar</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </VStack>
    )
};

export default Eventlist;