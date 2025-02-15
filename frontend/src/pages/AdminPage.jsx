import { 
    Box, 
    Container, 
    Heading, 
    Tab, 
    TabList, 
    TabPanel, 
    TabPanels, 
    Tabs,
    useColorModeValue,
} from '@chakra-ui/react';
import UsersManagement from '../components/admin/UsersManagement';
import EventsManagement from '../components/admin/EventsManagement';

const AdminPage = () => {
    const activeTabBg = useColorModeValue('white', 'gray.800');
    const inactiveTabBg = useColorModeValue('#d8e3e7', 'gray.600');

    return (
        <Box minH="calc(100vh - 70px)" bg="#a2cfd4">
            <Container maxW="container.xl" py={8}>
                <Heading mb={8} color="gray.800" fontWeight="bold">
                    Admin Panel
                </Heading>
                <Tabs 
                    variant="enclosed"
                    colorScheme="teal"
                    isLazy
                >
                    <TabList 
                        borderBottom="none" 
                        gap={4}
                    >
                        <Tab
                            px={8}
                            py={4}
                            fontWeight="semibold"
                            bg={inactiveTabBg}
                            color="gray.600"
                            borderRadius="md"
                            border="none"
                            _selected={{
                                color: 'teal.800',
                                bg: activeTabBg,
                                boxShadow: 'md',
                                fontWeight: 'bold',
                            }}
                            _hover={{
                                bg: activeTabBg,
                                color: 'teal.600',
                            }}
                            transition="all 0.2s"
                        >
                            Users Management
                        </Tab>
                        <Tab
                            px={8}
                            py={4}
                            fontWeight="semibold"
                            bg={inactiveTabBg}
                            color="gray.600"
                            borderRadius="md"
                            border="none"
                            _selected={{
                                color: 'teal.800',
                                bg: activeTabBg,
                                boxShadow: 'md',
                                fontWeight: 'bold',
                            }}
                            _hover={{
                                bg: activeTabBg,
                                color: 'teal.600',
                            }}
                            transition="all 0.2s"
                        >
                            Events Management
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel p={0} pt={6}>
                            <UsersManagement />
                        </TabPanel>

                        <TabPanel p={0} pt={6}>
                            <EventsManagement />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default AdminPage; 