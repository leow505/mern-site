import { Box, Button, Heading, Text, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Textarea, useToast, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useState } from 'react';
import { FaDiscord } from 'react-icons/fa';

const OfficerApplication = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, token } = useAuthStore();
    const navigate = useNavigate();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        reason: '',
        experience: '',
        commitment: '',
        discordTag: ''
    });

    const handleApply = () => {
        if (!user) {
            toast({
                title: 'Authentication Required',
                description: 'Please log in to apply for an officer position.',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
            return;
        }
        onOpen();
    };

    const handleSubmit = async () => {
        if (!formData.discordTag) {
            toast({
                title: 'Discord Tag Required',
                description: 'Please provide your Discord tag for communication.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Validate Discord tag format
        const discordTagRegex = /^.{3,32}#[0-9]{4}$/;
        if (!discordTagRegex.test(formData.discordTag)) {
            toast({
                title: 'Invalid Discord Tag',
                description: 'Please enter a valid Discord tag (e.g., Username#1234)',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // This is a placeholder for future backend integration
        setIsSubmitting(true);
        toast({
            title: 'Application Received',
            description: 'Thank you for your interest! We will contact you on Discord soon.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        setIsSubmitting(false);
        onClose();
    };

    return (
        <Box bg="#d8e3e7" p={10} borderRadius="lg" mt={16}>
            <VStack spacing={6} align="stretch">
                <Heading size="xl" textAlign="center">
                    Become an Officer
                </Heading>
                <Text fontSize="lg" textAlign="center" maxW="2xl" mx="auto">
                    Interested in becoming a club officer? Join our leadership team and help make a difference 
                    in our community. We're looking for dedicated individuals who are passionate about technology 
                    and want to contribute to the club's growth.
                </Text>
                <Box textAlign="center">
                    <Button
                        size="lg"
                        colorScheme="blue"
                        onClick={handleApply}
                        px={8}
                    >
                        Apply Now
                    </Button>
                </Box>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Officer Application</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Discord Tag</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>
                                        <FaDiscord />
                                    </InputLeftAddon>
                                    <Input
                                        value={formData.discordTag}
                                        onChange={(e) => setFormData({...formData, discordTag: e.target.value})}
                                        placeholder="Username#1234"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Why do you want to become an officer?</FormLabel>
                                <Textarea
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    placeholder="Share your motivation..."
                                    rows={4}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>What relevant experience do you have?</FormLabel>
                                <Textarea
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                    placeholder="Tell us about your experience..."
                                    rows={4}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>How much time can you commit weekly?</FormLabel>
                                <Input
                                    value={formData.commitment}
                                    onChange={(e) => setFormData({...formData, commitment: e.target.value})}
                                    placeholder="e.g., 5-10 hours per week"
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isLoading={isSubmitting}
                        >
                            Submit Application
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default OfficerApplication; 