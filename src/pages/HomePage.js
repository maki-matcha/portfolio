import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Wrap,
  Text,
  VStack,
  Badge,
  Avatar,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import {
  ArrowRight,
  Mail,
  GitBranch,
  Briefcase,
  Award,
  MapPin,
  ChevronDown,
  Star,
  Code2,
  Zap,
  AtSign,
  UserCheck,
  Database,
  Layers,
  Server,
  Terminal,
  PackageCheck
} from 'lucide-react';
import {
  SiReact,
  SiChakraui,
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
  SiVercel,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiHtml5,
  SiPhp,
  SiGmail,
  SiGithub,
} from 'react-icons/si';
import { siteMeta, profileSummary, educationTimeline, certificates, techStack, featuredProjects, achievements } from '../data';

const typePhrases = ['Antique, Philippines', 'Web Developer', 'Aspiring AI Engineer'];
const phraseIcons = {
  'Antique, Philippines': MapPin,
  'Web Developer': Code2,
  'Aspiring AI Engineer': Zap,
};
const MotionBox = motion(Box);
const MotionCard = motion(Card);

const contactLinks = [
  { label: 'Email', href: 'mailto:xdcollamatxd@gmail.com', icon: SiGmail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vincent-louise-collamat-697434394/', icon: ArrowRight },
  { label: 'Github', href: siteMeta.github, icon: SiGithub },
];

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Contact', href: '#contact' },
];

export default function HomePage() {
  // Monochrome professional theme
  const cardBg = '#FFFFFF';
  const borderColor = '#E0E0E0';
  const accent = '#888888';
  const textColor = '#121212';
  const mutedText = '#666666';
  const pageBg = '#F9F9F9';

  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((value) => !value);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (pause) {
      const pauseTimer = setTimeout(() => setPause(false), 900);
      return () => clearTimeout(pauseTimer);
    }

    const currentPhrase = typePhrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextIndex = charIndex + 1;
        setTypedText(currentPhrase.slice(0, nextIndex));
        setCharIndex(nextIndex);

        if (nextIndex === currentPhrase.length) {
          setPause(true);
          setIsDeleting(true);
        }
      } else {
        const nextIndex = charIndex - 1;
        setTypedText(currentPhrase.slice(0, nextIndex));
        setCharIndex(nextIndex);

        if (nextIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typePhrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, pause, phraseIndex]);

  // Subtle fade/slide-in for initial load only
  const fadeInUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  useEffect(() => {
    const prevUserSelect = document.body.style.userSelect;
    const prevWebkitUserSelect = document.body.style.webkitUserSelect;
    const prevMozUserSelect = document.body.style.MozUserSelect;
    const prevMsUserSelect = document.body.style.msUserSelect;

    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.MozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    return () => {
      document.body.style.userSelect = prevUserSelect;
      document.body.style.webkitUserSelect = prevWebkitUserSelect;
      document.body.style.MozUserSelect = prevMozUserSelect;
      document.body.style.msUserSelect = prevMsUserSelect;
    };
  }, []);

  return (

    <Box display="flex" flexDirection="column" minH="100vh" pt={{ base: '100px', md: '96px' }} bg={pageBg} color={textColor} overflow="hidden">
      {/* Fixed Header */}
      <Box as="header" position="fixed" top="0" left="0" right="0" zIndex={999} bg="#FFFFFF" borderBottom={`1px solid ${borderColor}`}>
        <Container maxW="7xl" py={4}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
            <HStack spacing={3}>
              <Box bg="#121212" color="white" px={3} py={1} borderRadius="full" fontSize="sm" fontWeight="bold">VC</Box>
            </HStack>
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <ChakraLink
                  key={item.href}
                  href={item.href}
                  fontWeight="medium"
                  color={mutedText}
                  _hover={{ color: '#121212', textDecoration: 'underline' }}
                  onClick={e => {
                    const el = document.querySelector(item.href);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.label}
                </ChakraLink>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>
    <Box flex="1">
      {/* Hero Section */}

      <Box as="section" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
        <Container maxW="7xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Grid templateColumns={{ base: '1fr' }} gap={8} alignItems="center">
              <Stack spacing={4} align="center">
                <Avatar size="xl" name={siteMeta.name} src="/images/profilemaki.jpg" border="1px solid" borderColor="#E0E0E0" />
                <Badge width="fit-content" bg="#121212" color="white" px={3} py={1} borderRadius="full" fontSize="sm" fontWeight="600">
                  Web Developer
                </Badge>
                <Heading as="h1" size="2xl" fontWeight="700" letterSpacing="-0.4px" lineHeight="1.1" color={textColor}>
                  {siteMeta.name}
                </Heading>
                <Text fontSize="lg" color={mutedText} maxW="2xl" lineHeight="1.5">
                  {profileSummary}
                </Text>
                <HStack spacing={2} mt={2} justify="center">
                  <Icon as={phraseIcons[typePhrases[phraseIndex]]} boxSize={5} color="#121212" />
                  <Box
                    as="code"
                    fontSize="lg"
                    fontFamily="mono"
                    color="#121212"
                    bg="#F2F2F2"
                    px={3}
                    py={2}
                    borderRadius="md"
                    border="1px solid #E0E0E0"
                    display="inline-flex"
                    alignItems="center"
                  >
                    <Text as="span" whiteSpace="pre">
                      {typedText}
                    </Text>
                    <Box as="span" display="inline-block" opacity={cursorVisible ? 1 : 0} ml={2}>
                      |
                    </Box>
                  </Box>
                </HStack>
                <HStack spacing={4} wrap="wrap" pt={4} justify="center">
                  <Button as={ChakraLink} href="#projects" rightIcon={<ArrowRight size={18} />} colorScheme="gray" bg="#121212" color="white" size="md" fontWeight="600" _hover={{ bg: '#333333', color: 'white' }} onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector('#projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}>
                    View Projects
                  </Button>
                  <Button
                    as={ChakraLink}
                    href="#contact"
                    variant="outline"
                    color="#121212"
                    borderColor={borderColor}
                    size="md"
                    fontWeight="bold"
                    _hover={{ bg: '#F1F1F1', color: '#121212' }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector('#contact');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Contact Me
                  </Button>
                </HStack>
              </Stack>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Box as="section" id="about" py={{ base: 8, md: 10 }} px={{ base: 4, md: 8 }} bg="transparent">
        <Container maxW="7xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Heading as="h2" size="xl" mb={8} color={textColor} textAlign="center">
              About Me
            </Heading>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
              <Card bg={cardBg} border={`1px solid ${borderColor}`} borderRadius="md" p={4}>
                <CardBody>
                  <HStack spacing={3} mb={3}>
                    <Icon as={Code2} boxSize={5} color={accent} />
                    <Heading size="sm" color={textColor}>Developer</Heading>
                  </HStack>
                  <Text color={mutedText} lineHeight="1.7" fontSize="sm">
                    I specialize in React and modern web technologies, crafting responsive, accessible, and performant interfaces. My focus is user-centered design.
                  </Text>
                </CardBody>
              </Card>

              <Card bg={cardBg} border={`1px solid ${borderColor}`} borderRadius="md" p={4}>
                <CardBody>
                  <HStack spacing={3} mb={3}>
                    <Icon as={Zap} boxSize={5} color={accent} />
                    <Heading size="sm" color={textColor}>Full-Stack Mindset</Heading>
                  </HStack>
                  <Text color={mutedText} lineHeight="1.7" fontSize="sm">
                    Beyond frontend, I understand backend systems, databases, and deployment. This holistic view helps me build practical, scalable solutions.
                  </Text>
                </CardBody>
              </Card>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      {/* Projects Section */}
      <Box as="section" id="projects" py={{ base: 8, md: 10 }} px={{ base: 4, md: 8 }}>
        <Container maxW="7xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
              <Heading as="h2" size="xl" color={textColor}>
                Projects
              </Heading>
              <Button as={RouterLink} to="/projects" rightIcon={<ArrowRight size={18} />} variant="outline" borderColor={borderColor} color={textColor}>
                View All
              </Button>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
              {featuredProjects.slice(0, 3).map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <Card
                    bg={cardBg}
                    border={`1px solid ${borderColor}`}
                    borderRadius="md"
                    overflow="hidden"
                    height="100%"
                    _hover={{ boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}
                    transition="all 0.2s"
                  >
                    <Box position="relative" height="160px" overflow="hidden">
                      <Image src={project.img} alt={project.title} w="100%" h="100%" objectFit="cover" />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.300"
                      />
                    </Box>
                    <CardBody>
                      <Badge mb={3} px={3} py={1} variant="outline" borderColor="#121212" color="#121212" textTransform="uppercase" fontSize="0.65rem" letterSpacing="0.08em" bg="transparent">
                        {project.badge}
                      </Badge>
                      <Heading size="md" mb={2} color={textColor}>
                        {project.title}
                      </Heading>
                      <Text color={mutedText} fontSize="sm" mb={4} noOfLines={2}>
                        {project.desc}
                      </Text>
                      <HStack spacing={2} wrap="wrap" mb={4}>
                        {project.tech.split(' / ').slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="outline" borderColor="#121212" color="#121212" px={3} py={1} fontSize="xs" bg="transparent">
                            {tech}
                          </Badge>
                        ))}
                      </HStack>
                      <Button as={RouterLink} to={`/projects/${project.id}`} size="sm" width="100%" variant="ghost" color={textColor} border={`1px solid ${borderColor}`}>
                        Learn More →
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        </Container>
      </Box>

      {/* Tech Stack + Contact Section */}
      <Box as="section" id="tech-stack" py={{ base: 8, md: 10 }} px={{ base: 4, md: 8 }}>
        <Container maxW="7xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={8} alignItems="stretch">
              <Box display="flex" flexDirection="column" h="100%" justifyContent="flex-start">
                <Heading as="h2" size="xl" mb={8} color={textColor} textAlign={{ base: 'center', xl: 'left' }}>
                  Tech Stack
                </Heading>
                <Card bg={cardBg} border={`1px solid ${borderColor}`} borderRadius="md" p={4} flex="1">
                  <Stack spacing={6} h="100%">
                    {Object.entries(techStack).map(([category, items]) => (
                      <Box key={category}>
                        <Text fontSize="lg" fontWeight="600" mb={4} color={textColor}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Text>
                        <Wrap spacing={3} shouldWrapChildren>
                          {items.map((item) => (
                            <Box
                              key={item}
                              px={4}
                              py={3}
                              borderRadius="md"
                              border={`1px solid ${borderColor}`}
                              bg="#FFFFFF"
                              transition="transform 0.15s ease, box-shadow 0.15s ease"
                              _hover={{ transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.06)' }}
                              cursor="default"
                            >
                              <HStack spacing={3}>
                                <Icon as={getTechIcon(item)} boxSize={5} color={textColor} />
                                <Text fontSize="sm" fontWeight="500" color={textColor}>
                                  {item}
                                </Text>
                              </HStack>
                            </Box>
                          ))}
                        </Wrap>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Box>

              <Box id="contact" scrollMarginTop="72px" display="flex" flexDirection="column" h="100%" justifyContent="flex-start">
                <Heading as="h2" size="xl" mb={8} color={textColor} textAlign={{ base: 'center', xl: 'left' }}>
                  Let's Connect
                </Heading>
                <Card bg={cardBg} border={`1px solid ${borderColor}`} borderRadius="md" p={4} flex="1">
                  <CardBody display="flex" flexDirection="column" justifyContent="space-between" h="100%">
                    <Heading size="sm" mb={3} color={textColor}>
                      Get in Touch
                    </Heading>
                    <Text color={mutedText} mb={6}>
                      Feel free to reach out for collaborations, opportunities, or just a friendly chat.
                    </Text>
                    <VStack align="start" spacing={3}>
                      {contactLinks.map((link) => (
                        <ChakraLink
                          key={link.label}
                          href={link.href}
                          isExternal
                          display="inline-flex"
                          alignItems="center"
                          gap={3}
                          color={textColor}
                          fontWeight="600"
                          _hover={{ textDecoration: 'underline' }}
                        >
                          <Icon as={link.icon} boxSize={5} color={textColor} />
                          {link.label}
                        </ChakraLink>
                      ))}
                    </VStack>
                    <Text color={mutedText} ml={7}>Open to internships & collaborations</Text>
                  </CardBody>
                </Card>
              </Box>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
      {/* Footer */}
      <Box py={8} textAlign="center" borderTop={`1px solid ${borderColor}`} color={mutedText} bg="#F9F9F9">
        <Container maxW="7xl">
          <Text fontSize="sm">(c) 2026 Vincent Louise Collamat. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
}

// Helper to map tech names to icons
function getTechIcon(name) {
  switch (name.toLowerCase()) {
    case 'react':
      return SiReact;
    case 'chakra ui':
    case 'chakraui':
      return SiChakraui;
    case 'next.js':
    case 'nextjs':
      return SiNextdotjs;
    case 'tailwindcss':
    case 'tailwind css':
      return SiTailwindcss;
    case 'figma':
      return SiFigma;
    case 'vercel':
      return SiVercel;
    case 'node.js':
    case 'nodejs':
      return SiNodedotjs;
    case 'express':
      return SiExpress;
    case 'mongodb':
      return SiMongodb;
    case 'javascript':
      return SiJavascript;
    case 'html5':
    case 'html':
      return SiHtml5;
    case 'php':
      return SiPhp;
    case 'css3':
    case 'css':
      return Star;
    case 'mern stack':
      return SiMongodb;
    default:
      return Star;
  }
}
