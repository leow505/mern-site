import { 
  Button, 
  Flex, 
  Heading, 
  HStack, 
  IconButton, 
  List, 
  ListItem, 
  Box, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  VStack,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal
} from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoMenu, IoClose, IoPerson } from "react-icons/io5";
import { FaMeta, FaXTwitter, FaDiscord } from "react-icons/fa6";
import { useAuthStore } from "../store/auth";

const socialIcons = [
  { icon: <FaMeta size={25}/>, link: "https://www.meta.com" },
  { icon: <FaXTwitter size={25}/>, link: "https://twitter.com" },
  { icon: <FaDiscord size={25}/>, link: "https://discord.com" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const mainMenu = useDisclosure();
  const dashboardMenu = useDisclosure();

  // Check if user has event creation privileges
  const hasEventPrivileges = user && ['admin', 'officer', 'organizer'].includes(user.role);
  
  console.log('Current user:', user); // Add this for debugging

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      navigate('/login');
      mainMenu.onClose();
      dashboardMenu.onClose();
    }
  };

  const getNavbarLinks = () => {
    const baseLinks = [
      { name: "Events", href: "/" },
      { name: "About", href: "/about"},
    ];

    if (!user) {
      return [...baseLinks, { name: "Login", href: "/login" }];
    }

    return [...baseLinks];
  };

  const MobileNavButton = ({ to, children, onClick }) => (
    <Button
      w="full"
      variant="ghost"
      p={3}
      justifyContent="flex-start"
      _hover={{
        bg: "teal.50",
      }}
      onClick={() => {
        if (onClick) {
          onClick();
          mainMenu.onClose();
          dashboardMenu.onClose();
        } else if (to) {
          navigate(to);
          mainMenu.onClose();
          dashboardMenu.onClose();
        }
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box w="full" bg="#d8e3e7" shadow="md" position="relative" zIndex={999}>
      <Flex 
        alignItems="center"  
        justifyContent="space-between"
        maxW="container.lg" 
        mx="auto"
        px={5}
        h="70px"
      >
        <Heading fontWeight="medium" display="flex">
          <Link to={"/"}>CS Club</Link>
        </Heading>
        
        {/* Desktop Navigation */}
        <List display={{base: "none", md:'flex'}}>
          {getNavbarLinks().map((link, index) =>(
            <ListItem key={index}>
              <Link to={link.href} style={{ display: 'block' }}>
                <Button 
                  p="25px 50px" 
                  size="lg"
                  borderRadius="0" 
                  variant="plain" 
                  borderBottom="10px solid #9fcacf" 
                  width="100%"
                  _hover={{
                    borderBottomColor: "#f9ac00",
                  }}
                  borderBottomColor={location.pathname === link.href ? "#f9ac00" : "#9fcacf"}
                >
                  {link.name}
                </Button>
              </Link>
            </ListItem>
          ))}
          {user && (
            <ListItem>
              <Menu>
                <MenuButton
                  as={Button}
                  p="25px 50px"
                  size="lg"
                  borderRadius="0"
                  variant="plain"
                  borderBottom="10px solid #9fcacf"
                  _hover={{
                    borderBottomColor: "#f9ac00",
                  }}
                  borderBottomColor={location.pathname === '/dashboard' ? "#f9ac00" : "#9fcacf"}
                >
                  Dashboard
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/profile">Profile</MenuItem>
                  {user.role === 'admin' && <MenuItem as={Link} to="/admin">Admin Panel</MenuItem>}
                  {hasEventPrivileges && <MenuItem as={Link} to="/create">Create Event</MenuItem>}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </ListItem>
          )}
        </List>

        {/* Desktop Social Icons */}
        <Flex gap={5} display={{base:"none", md:"flex"}}>
          {socialIcons.map((social, index) => (
            <Link fontSize={50} key={index} to={social.link}>
              <Box _hover={{
                  color: "#f9ac00",
                }}>{social.icon}</Box>
            </Link>
          ))}
        </Flex>

        {/* Mobile Menu Buttons */}
        <HStack display={{base:"flex", md:"none"}} spacing={2}>
          {user && (
            <Popover
              isOpen={dashboardMenu.isOpen}
              onClose={dashboardMenu.onClose}
              placement="bottom-end"
              closeOnBlur={true}
            >
              <PopoverTrigger>
                <IconButton
                  aria-label="Dashboard Menu"
                  icon={<IoPerson size={24}/>}
                  onClick={dashboardMenu.onToggle}
                  variant="ghost"
                  colorScheme="teal"
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent width="200px" _focus={{ boxShadow: 'md' }}>
                  <PopoverBody p={0}>
                    <VStack align="stretch" spacing={0}>
                      <MobileNavButton to="/profile">Profile</MobileNavButton>
                      {user?.role === 'admin' && (
                        <MobileNavButton to="/admin">Admin Panel</MobileNavButton>
                      )}
                      {hasEventPrivileges && (
                        <MobileNavButton to="/create">Create Event</MobileNavButton>
                      )}
                      <MobileNavButton onClick={handleLogout}>Logout</MobileNavButton>
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
          
          <Popover
            isOpen={mainMenu.isOpen}
            onClose={mainMenu.onClose}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <IconButton 
                aria-label="Main Menu" 
                icon={mainMenu.isOpen ? <IoClose size={24}/> : <IoMenu size={24}/>}
                onClick={mainMenu.onToggle}
                variant="ghost"
                colorScheme="teal"
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="200px" _focus={{ boxShadow: 'md' }}>
                <PopoverBody p={0}>
                  <VStack align="stretch" spacing={0}>
                    {getNavbarLinks().map((link, index) => (
                      <MobileNavButton key={index} to={link.href}>
                        {link.name}
                      </MobileNavButton>
                    ))}
                    <Box p={4}>
                      <Heading size="sm" mb={2}>Follow Us</Heading>
                      <HStack spacing={4}>
                        {socialIcons.map((social, index) => (
                          <Link key={index} to={social.link}>
                            <Box _hover={{ color: "#f9ac00" }}>
                              {social.icon}
                            </Box>
                          </Link>
                        ))}
                      </HStack>
                    </Box>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;