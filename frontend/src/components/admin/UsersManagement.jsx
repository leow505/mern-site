import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
    Badge,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useAuthStore();

    // Fetch users data
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/auth/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
                setFilteredUsers(data.data);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch users',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        const filtered = users.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    // Handle role change
    const handleRoleChange = async (userId, newRole) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/auth/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });
            const data = await response.json();
            
            if (data.success) {
                toast({
                    title: 'Success',
                    description: 'User role updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                fetchUsers(); // Refresh user list
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update user role',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle user update
    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`/api/auth/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: selectedUser.name,
                    email: selectedUser.email,
                    title: selectedUser.title
                })
            });
            const data = await response.json();
            
            if (data.success) {
                toast({
                    title: 'Success',
                    description: 'User information updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                fetchUsers(); // Refresh user list
                onClose(); // Close the modal
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update user information',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle edit button click
    const handleEditClick = (user) => {
        setSelectedUser({ ...user });
        onOpen();
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Group users by role
    const groupedUsers = (users) => {
        const roleOrder = ['admin', 'officer', 'organizer', 'user'];
        const grouped = {};
        
        // Initialize groups
        roleOrder.forEach(role => {
            grouped[role] = [];
        });

        // Group users
        users.forEach(user => {
            if (grouped[user.role]) {
                grouped[user.role].push(user);
            }
        });

        return grouped;
    };

    // Filter and group users
    const getFilteredAndGroupedUsers = () => {
        const filtered = users.filter(user => 
            searchQuery === '' ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return groupedUsers(filtered);
    };

    const renderUserGroup = (users, role) => {
        if (users.length === 0) return null;

        const roleColors = {
            admin: 'red',
            officer: 'blue',
            organizer: 'green',
            user: 'gray'
        };

        return (
            <Box key={role} mb={6}>
                <Box 
                    py={2} 
                    px={4} 
                    bg={`${roleColors[role]}.50`}
                    borderBottom={`2px solid`}
                    borderColor={`${roleColors[role]}.200`}
                >
                    <Badge colorScheme={roleColors[role]} fontSize="md" px={3} py={1}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}s ({users.length})
                    </Badge>
                </Box>
                <Table variant="simple" bg="white">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Title</Th>
                            <Th>Email</Th>
                            <Th>Current Role</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user._id}>
                                <Td>{user.name}</Td>
                                <Td>{user.title || '-'}</Td>
                                <Td>{user.email}</Td>
                                <Td>
                                    <Badge colorScheme={roleColors[user.role]}>
                                        {user.role}
                                    </Badge>
                                </Td>
                                <Td>
                                    <HStack spacing={2}>
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            isLoading={isLoading}
                                            onClick={() => handleRoleChange(user._id, 'officer')}
                                            isDisabled={user.role === 'officer' || user.role === 'admin'}
                                        >
                                            Make Officer
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorScheme="green"
                                            isLoading={isLoading}
                                            onClick={() => handleRoleChange(user._id, 'organizer')}
                                            isDisabled={user.role === 'organizer' || user.role === 'admin'}
                                        >
                                            Make Organizer
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorScheme="purple"
                                            leftIcon={<EditIcon />}
                                            onClick={() => handleEditClick(user)}
                                            isDisabled={user.role === 'admin'}
                                        >
                                            Edit
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        );
    };

    return (
        <Box>
            <Box mb={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.400' />
                    </InputLeftElement>
                    <Input
                        placeholder='Search by name or email...'
                        value={searchQuery}
                        onChange={handleSearch}
                        bg="white"
                        borderRadius="md"
                    />
                </InputGroup>
            </Box>
            <Box overflowX="auto">
                {Object.entries(getFilteredAndGroupedUsers()).map(([role, users]) => 
                    renderUserGroup(users, role)
                )}
            </Box>

            {/* Edit User Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleUserUpdate}>
                        <ModalHeader>Edit User Information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    value={selectedUser?.name || ''}
                                    onChange={(e) => setSelectedUser({
                                        ...selectedUser,
                                        name: e.target.value
                                    })}
                                    placeholder="User's name"
                                    required
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    value={selectedUser?.title || ''}
                                    onChange={(e) => setSelectedUser({
                                        ...selectedUser,
                                        title: e.target.value
                                    })}
                                    placeholder="User's title (e.g., Software Engineer, Student)"
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={selectedUser?.email || ''}
                                    onChange={(e) => setSelectedUser({
                                        ...selectedUser,
                                        email: e.target.value
                                    })}
                                    placeholder="User's email"
                                    required
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
                                Save Changes
                            </Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default UsersManagement; 