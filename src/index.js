import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Flex, VStack, HStack, Text,
  Heading, Card, CardBody, Badge, Icon,  Avatar,
  useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel,
  Grid, GridItem, Wrap, WrapItem, Tag, Tooltip, Image, Divider,
  AspectRatio, Slider, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { 
  FiMapPin, FiMail, FiGithub, FiBookOpen, 
  FiPlay, FiPause, FiSkipForward, FiSkipBack, FiMusic, FiVideo
} from 'react-icons/fi';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- ANIMATIONS ---
const waveAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ==========================================
// 1. ADD YOUR CUSTOM IMAGES HERE
// ==========================================
const featuredProjects = [
  {
    title: "TechnoDTR",
    badge: "Completed",
    color: "purple",
    desc: "Creating a daily time record system specifically for TechnoPH interns with unique features.",
    tech: "React / Chakra UI",
    techColor: "cyan.400",
    img: "/images/TechnoDTR.png"
  },
  {
    title: "First CRUD using React",
    badge: "Completed",
    color: "purple",
    desc: "Built a simple CRUD application using React and Node.js for QA testers to submit the anomalies that they noticed in the system.",
    tech: "React / Chakra UI / Node.js",
    techColor: "yellow.400",
    img: "/images/crudnimaki.png"
  },
  {
    title: "Granttrack",
    badge: "Completed",
    color: "purple",
    desc: "Helps students easily discover scholarships, apply online, and track their application status, while providing administrators a simple way to manage and organize programs efficiently.",
    tech: "MERN stack / ChakraUI v2",
    techColor: "green.400",
    img: "/images/granttrack.png"
  },
  {
    title: "AuxiliumAI",
    badge: "Testing",
    color: "yellow",
    desc: "An AI-powered triage system that automatically categorizes and prioritizes incoming medical or IT support tickets.",
    tech: "MERN stack / Python", 
    techColor: "green.400",
    img: "/images/auxiliumAI.png"
  }
];

// ==========================================
// 2. ADD YOUR CUSTOM MP3 MUSIC HERE
// ==========================================
const playlist = [
  { 
    title: "Pink Matter", 
    artist: "Frank Ocean", 
    cover: "/images/pinkmatter.jpg", 
    src: "/music/Pink Matter.mp3" 
  },
  { 
    title: "Summerhouse", 
    artist: "KOTA the friend", 
    cover: "/images/everything.jpg", 
    src: "/music/Summerhouse.mp3"
  },
  { 
    title: "One Night Only", 
    artist: "Sonder", 
    cover: "/images/onenightonly.jpg", 
    src: "/music/One Night Only.mp3"
  },
  { 
    title: "Dead man walking", 
    artist: "Brent Faiyaz", 
    cover: "/images/deadmanwalking.jpg", 
    src: "/music/dead man walking.mp3"
  }
];

export default function InternProfile() {
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedText = useColorModeValue('gray.600', 'gray.300');
  const brandAccent = useColorModeValue('#012034', 'blue.300');
  
  const emptyColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.300');
  const fillColorsLight = ['#cce5ff', '#66b2ff', '#0066cc', '#012034'];
  const fillColorsDark = ['#1e3a8a', '#1e40af', '#3b82f6', '#60a5fa'];
  const fillColors = useColorModeValue(fillColorsLight, fillColorsDark);

  const bgGradient = useColorModeValue(
    'linear-gradient(-45deg, #e0f2fe, #bae6fd, #fce7f3, #fbcfe8)', 
    'linear-gradient(-45deg, #0f172a, #1e3a8a, #4c0519, #831843)'  
  );

  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(0, 0, 0, 0.4)');
  const glassBorder = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.1)');
  const glassCardBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.500');
  
  const dotBg = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const dividerColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  // Removed fileInputRef since image upload is no longer needed


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 4000); 
    return () => clearInterval(slideTimer);
  }, []);

  const [currentSongIdx, setCurrentSongIdx] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicProgress, setMusicProgress] = useState(0);
  
  // NEW: State for formatting audio time
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState(0);
  const [durationDisplay, setDurationDisplay] = useState(0);
  
  // GitHub Contributions State
  const [githubContributions, setGithubContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(103);
  
  const musicAudioRef = useRef(null);

  // Helper function to convert seconds to M:SS format
  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (musicAudioRef.current) {
      musicAudioRef.current.pause();
    }
    
    musicAudioRef.current = new Audio(playlist[currentSongIdx].src);
    const audio = musicAudioRef.current;

    const updateProgress = () => {
      setMusicProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTimeDisplay(audio.currentTime);
      setDurationDisplay(audio.duration || 0);
    };
    
    const handleEnded = () => {
      setCurrentSongIdx((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress); // Ensure duration updates when loaded
    audio.addEventListener('ended', handleEnded);

    if (isPlayingMusic) {
      audio.play().catch(e => console.log("Audio play blocked", e));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIdx, isPlayingMusic]);

  useEffect(() => {
    if(!musicAudioRef.current) return;
    if(isPlayingMusic) {
      musicAudioRef.current.play().catch(e => console.log(e));
    } else {
      musicAudioRef.current.pause();
    }
  }, [isPlayingMusic]);

  // Fetch GitHub Contributions
  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        // Use GitHub GraphQL to get contributions
        const query = `
          query {
            user(login: "maki-matcha") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;
        
        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        
        const graphqlData = await graphqlResponse.json();
        
        if (graphqlData.data?.user?.contributionsCollection) {
          const calendar = graphqlData.data.user.contributionsCollection.contributionCalendar;
          setTotalContributions(calendar.totalContributions);
          
          // Flatten contributions into single array (last 52 weeks = ~364 days)
          const allContributions = [];
          calendar.weeks.forEach(week => {
            week.contributionDays.forEach(day => {
              allContributions.push(day.contributionCount);
            });
          });
          
          // Get the last 168 days of contributions (4 weeks visible in grid)
          setGithubContributions(allContributions.slice(-168));
        }
      } catch (error) {
        console.log('GitHub contributions fetch failed (expected for unauthenticated requests):', error);
        // Fallback to random contributions if API fails
        const randomContribs = Array.from({ length: 168 }, () => Math.floor(Math.random() * 5));
        setGithubContributions(randomContribs);
      }
    };
    
    fetchGitHubContributions();
  }, []);

  const handleNextSong = () => setCurrentSongIdx((prev) => (prev + 1) % playlist.length);
  const handlePrevSong = () => setCurrentSongIdx((prev) => (prev - 1 + playlist.length) % playlist.length);

  const generateContributions = () => {
    const boxes = [];
    const contribsToDisplay = githubContributions.length > 0 ? githubContributions : Array.from({ length: 168 }, () => Math.floor(Math.random() * 5));
    
    contribsToDisplay.forEach((count, i) => {
      let level = 0;
      if (count > 0) level = Math.min(3, Math.ceil(count / 2));
      
      boxes.push(
        <Tooltip key={i} label={`${count} contributions`} placement="top">
          <Box 
            w="14px" 
            h="14px" 
            bg={count === 0 ? emptyColor : fillColors[level]} 
            borderRadius="sm" 
            transition="all 0.2s" 
            _hover={{ transform: 'scale(1.2)' }} 
          />
        </Tooltip>
      );
    });
    return boxes;
  };

  const isPlayerActive = musicProgress > 0 || isPlayingMusic;

  return (
    <Box 
      m={0}
      p={{ base: 3, sm: 4, md: 8, lg: 10 }} 
      bg={bgGradient}
      backgroundSize="400% 400%"
      animation={`${waveAnimation} 15s ease infinite`}
      minH="100vh"
      position="relative"
      width="100%"
      overflowX="hidden"
    >
      {/* FLOATING MUSIC CONTROLLER */}
      <Box
        position="fixed"
        bottom={isPlayerActive ? { base: "16px", md: "24px" } : "-100px"}
        opacity={isPlayerActive ? 1 : 0}
        right={{ base: "12px", md: "24px" }}
        left={{ base: "12px", md: "auto" }}
        zIndex={1000}
        bg={glassBg}
        backdropFilter="blur(16px)"
        p={{ base: "8px", md: "8px" }}
        pr={{ base: 3, md: 5 }}
        borderRadius="full"
        boxShadow="dark-lg"
        display="flex"
        alignItems="center"
        gap={{ base: 2, md: 4 }}
        border="1px solid"
        borderColor={glassBorder}
        transition="all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        maxW={{ base: "calc(100vw - 24px)", md: "auto" }}
      >
        <Box position="relative">
          <Image 
            src={playlist[currentSongIdx].cover} 
            boxSize={{ base: "36px", md: "44px" }} 
            borderRadius="full" 
            animation={isPlayingMusic ? `${spin} 4s linear infinite` : 'none'}
            border="2px solid #1DB954"
            objectFit="cover"
          />
          {/* Vinyl Record Center Hole */}
          <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" boxSize="8px" bg={useColorModeValue('white','black')} borderRadius="full" />
        </Box>
        
        <VStack align="start" spacing={0} w={{ base: "80px", md: "120px" }} overflow="hidden">
          <Text fontSize="sm" fontWeight="bold" color={textColor} whiteSpace="nowrap" isTruncated w="full">{playlist[currentSongIdx].title}</Text>
          <Text fontSize="xs" color={mutedText} whiteSpace="nowrap" isTruncated w="full">{playlist[currentSongIdx].artist}</Text>
        </VStack>
        
        {/* ADDED NEXT & BACK BUTTONS TO FLOATING PLAYER */}
        <HStack spacing={3}>
          <Icon as={FiSkipBack} boxSize={4} color={textColor} cursor="pointer" _hover={{ opacity: 0.7 }} onClick={handlePrevSong} />
          
          <Flex 
            bg="#1DB954" color="black" boxSize="36px" borderRadius="full" align="center" justify="center" cursor="pointer"
            _hover={{ transform: "scale(1.1)", bg: "#1ed760" }} transition="all 0.2s" onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          >
            <Icon as={isPlayingMusic ? FiPause : FiPlay} ml={isPlayingMusic ? 0 : 1} boxSize={4} />
          </Flex>

          <Icon as={FiSkipForward} boxSize={4} color={textColor} cursor="pointer" _hover={{ opacity: 0.7 }} onClick={handleNextSong} />
        </HStack>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr", lg: "1fr", xl: "320px 1fr" }} gap={{ base: 4, md: 6, lg: 8 }} autoRows="auto" maxW="1400px" mx="auto" w="100%">
        
        {/* LEFT COLUMN: User Info */}
        <GridItem colSpan={{ base: 1, md: 1, xl: 1 }} order={{ base: 2, md: 2, xl: 1 }} w="100%">
          <VStack 
            align="stretch" 
            spacing={6} 
            bg={glassBg} 
            backdropFilter="blur(12px)" 
            p={{ base: 4, md: 6, lg: 8 }} 
            borderRadius="2xl" 
            border="1px solid" 
            borderColor={glassBorder}
            boxShadow="xl"
            animation={`${fadeIn} 0.5s ease-out forwards`}
            position="sticky"
            top={{ base: "auto", xl: "20px" }}
            mx="auto"
          >
            {/* PROFILE PICTURE */}
            <Box w="fit-content" mx="auto" animation={`${float} 6s ease-in-out infinite`}>
              <Avatar size="2xl" name="Vincent Louise Collamat" src="/images/profilemaki.jpg" bg="#012034" color="white" boxShadow="xl" border="4px solid" borderColor={brandAccent} />
            </Box>

            <Box textAlign="center">
              <Heading size={{ base: "md", md: "lg" }} color={textColor} mb={1}>Vincent Louise Collamat</Heading>
              <Text fontSize={{ base: "sm", md: "md" }} color={mutedText} fontWeight="medium" letterSpacing="wide">Aspiring Frontend Developer</Text>
            </Box>
            
            <Text color={textColor} fontSize={{ base: "xs", md: "sm" }} textAlign="center" lineHeight="tall">
              Passionate IT Intern specializing in frontend development, UI/UX design, and systems architecture. Always eager to learn new tech.
            </Text>
            
            <VStack align="stretch" spacing={4} mt={2} fontSize={{ base: "xs", md: "sm" }} color={textColor}>
              <HStack gap={{ base: 2, md: 3 }}><Icon as={FiMapPin} color={mutedText} boxSize={4} /><Text isTruncated>San Jose, Antique, Philippines</Text></HStack>
              <HStack gap={{ base: 2, md: 3 }}><Icon as={FiMail} color={mutedText} boxSize={4} /><Text as="a" href="mailto:collamatvincent@sac.edu.ph" _hover={{ color: brandAccent }} isTruncated>collamatvincent@sac.edu.ph</Text></HStack>
              <HStack gap={{ base: 2, md: 3 }}><Icon as={FiGithub} color={mutedText} boxSize={4} /><Text as="a" href="https://github.com/maki-matcha" target="_blank" _hover={{ color: brandAccent }}>@maki-matcha</Text></HStack>
            </VStack>
            
            <Divider borderColor={dividerColor} />
            
            <Box>
              <Heading size="xs" color={mutedText} mb={4} textTransform="uppercase" letterSpacing="widest" fontSize={{ base: "2xs", md: "xs" }}>Top Skills</Heading>
              <Wrap spacing={{ base: 2, md: 3 }}>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="cyan" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>React</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="yellow" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>JavaScript</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="teal" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>Chakra UI</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="green" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>Node.js</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="gray" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>Express</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="green" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>MongoDB</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="pink" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>Figma</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="purple" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>PHP</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="blue" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>MERN stack</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="solid" bg="black" color="white" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>Next.js</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="cyan" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>TailwindCSS</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="orange" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>HTML5</Tag></WrapItem>
                <WrapItem><Tag size={{ base: "sm", md: "md" }} variant="solid" bg="black" color="white" transition="all 0.2s" _hover={{ transform: 'scale(1.1)' }}>Vercel</Tag></WrapItem>
              </Wrap>
            </Box>
          </VStack>
        </GridItem>

        <GridItem order={{ base: 1, md: 1, xl: 2 }} w="100%">
          <Tabs colorScheme="blue" variant="line">
            <TabList borderColor={dividerColor} mb={6} overflowX={{ base: "auto", md: "visible" }}>
              <Tab fontWeight="bold" color={mutedText} fontSize={{ base: "sm", md: "md" }} _selected={{ color: textColor, borderColor: brandAccent }}><HStack gap={{ base: 1, md: 2 }}><Icon as={FiBookOpen}/><Text>Overview</Text></HStack></Tab>
              <Tab fontWeight="bold" color={mutedText} fontSize={{ base: "sm", md: "md" }} _selected={{ color: textColor, borderColor: brandAccent }}><HStack gap={{ base: 1, md: 2 }}><Icon as={FiMusic}/><Text>Hobbies</Text></HStack></Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel p={0}>
                
                <Flex justify="space-between" align="center" mb={4} animation={`${fadeIn} 0.5s ease-out forwards`}>
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color={textColor}>Featured Projects</Text>
                </Flex>
                
                <Box position="relative" mb={8} w="full">
                  {featuredProjects.map((project, idx) => (
                    currentSlide === idx && (
                      <Card 
                        key={idx} 
                        variant="filled" 
                        bg={glassCardBg} 
                        backdropFilter="blur(10px)" 
                        overflow="hidden" 
                        shadow="xl"
                        animation={`${fadeIn} 0.6s ease-out forwards`}
                        h={{ base: "auto", sm: "auto", md: "280px" }}
                        border="1px solid"
                        borderColor={glassBorder}
                        _hover={{ transform: 'translateY(-4px)', shadow: '2xl' }}
                        transition="all 0.3s ease"
                      >
                        <Grid templateColumns={{ base: "1fr", sm: "1fr", md: "1fr 1.2fr" }} h="100%" gap={0}>
                          <Image 
                            src={project.img} 
                            alt={project.title} 
                            h={{ base: "180px", sm: "220px", md: "100%" }}
                            w="100%"
                            objectFit="cover"
                            objectPosition="top"
                          />
                          <CardBody display="flex" flexDirection="column" justify="center" p={{ base: 4, md: 6 }}>
                            <HStack justify="space-between" mb={4} gap={2} flexWrap="wrap">
                              <Heading size={{ base: "sm", md: "md" }} color={textColor} isTruncated>{project.title}</Heading>
                              <Badge colorScheme={project.color} px={2} py={1} borderRadius="md" fontSize="xs">{project.badge}</Badge>
                            </HStack>
                            <Text fontSize={{ base: "sm", md: "md" }} color={mutedText} mb={6} lineHeight="tall" display={{ base: "none", md: "block" }}>{project.desc}</Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} color={mutedText} mb={4} lineHeight="tall" display={{ base: "block", md: "none" }} noOfLines={2}>{project.desc}</Text>
                            <HStack spacing={4} fontSize={{ base: "xs", md: "sm" }} color={mutedText} fontWeight="bold" gap={2}>
                              <HStack><Box w="12px" h="12px" borderRadius="full" bg={project.techColor} /><Text isTruncated>{project.tech}</Text></HStack>
                            </HStack>
                          </CardBody>
                        </Grid>
                      </Card>
                    )
                  ))}
                  <HStack justify="center" mt={4} spacing={2}>
                    {featuredProjects.map((_, idx) => (
                      <Box 
                        key={idx} 
                        w={currentSlide === idx ? "24px" : "8px"} 
                        h="8px" 
                        borderRadius="full" 
                        bg={currentSlide === idx ? brandAccent : dotBg}
                        transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
                        cursor="pointer"
                        onClick={() => setCurrentSlide(idx)}
                      />
                    ))}
                  </HStack>
                </Box>

                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mt={8} mb={4} color={textColor} animation={`${fadeIn} 0.5s ease-out forwards`}>Experience & Education</Text>
                <VStack 
                  align="stretch" 
                  spacing={6} 
                  mb={10} 
                  position="relative" 
                  animation={`${fadeIn} 0.5s ease-out forwards`}
                  _before={{ content: '""', position: "absolute", left: "19px", top: "10px", bottom: "10px", width: "2px", bg: useColorModeValue('blue.200', 'blue.700') }}
                >
                  <Box pl={{ base: 0, md: 10 }} position="relative">
                    <Box position="absolute" left={{ base: "-999px", md: "13px" }} top="4px" boxSize="14px" borderRadius="full" bg={brandAccent} border="3px solid" borderColor={useColorModeValue('#f0f9ff', '#0f172a')} display={{ base: "none", md: "block" }} />
                    <Heading size="sm" color={textColor} fontSize={{ base: "md", md: "md" }}>IT Intern</Heading>
                    <Text fontSize="xs" color={brandAccent} fontWeight="bold" mt={1}>TechnoPH Systems & Integration Inc. • Present</Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color={mutedText} mt={2}>Developing responsive UI interfaces using React and Chakra UI. Implemented a fully functional DTR Dashboard with activity tracking and other features.</Text>
                  </Box>
                  <Box pl={{ base: 0, md: 10 }} position="relative">
                    <Box position="absolute" left={{ base: "-999px", md: "13px" }} top="4px" boxSize="14px" borderRadius="full" bg={brandAccent} border="3px solid" borderColor={useColorModeValue('#f0f9ff', '#0f172a')} display={{ base: "none", md: "block" }} />
                    <Heading size="sm" color={textColor} fontSize={{ base: "md", md: "md" }}>Capstone Defended</Heading>
                    <Text fontSize="xs" color={brandAccent} fontWeight="bold" mt={1}>CAP102 • AY 2025-2026</Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color={mutedText} mt={2}>Took the Frontend role in Developing "An IoT-based Smart Distress Signal for Fast Emergency Response in San Jose de Buenavista".</Text>
                  </Box>
                  <Box pl={{ base: 0, md: 10 }} position="relative">
                    <Box position="absolute" left={{ base: "-999px", md: "13px" }} top="4px" boxSize="14px" borderRadius="full" bg={brandAccent} border="3px solid" borderColor={useColorModeValue('#f0f9ff', '#0f172a')} display={{ base: "none", md: "block" }} />
                    <Heading size="sm" color={textColor} fontSize={{ base: "md", md: "md" }}>BS Information Technology</Heading>
                    <Text fontSize="xs" color={brandAccent} fontWeight="bold" mt={1}>St. Anthony's College • 2021 - Present</Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color={mutedText} mt={2}>Specializing in Web Development and Systems Design with a passion for modern frontend frameworks.</Text>
                  </Box>
                </VStack>

                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={2} color={textColor} animation={`${fadeIn} 0.5s ease-out forwards`}>Activity Overview</Text>
                <Text fontSize={{ base: "xs", md: "sm" }} mb={4} color={mutedText} animation={`${fadeIn} 0.5s ease-out forwards`}>{totalContributions} contributions on GitHub this year</Text>
                <Card variant="filled" bg={glassCardBg} backdropFilter="blur(10px)" p={6} mb={10} shadow="sm" border="1px solid" borderColor={glassBorder} animation={`${fadeIn} 0.5s ease-out forwards`} position="relative" zIndex={1}>
                  <Flex wrap="wrap" gap="4px" maxW="100%" position="relative" zIndex={1}>{generateContributions()}</Flex>
                  <HStack mt={5} fontSize="xs" color={mutedText} justify="flex-end" spacing={2} fontWeight="bold">
                    <Text>Less</Text>
                    <Box w="14px" h="14px" bg={emptyColor} borderRadius="sm" />
                    <Box w="14px" h="14px" bg={fillColors[0]} borderRadius="sm" />
                    <Box w="14px" h="14px" bg={fillColors[1]} borderRadius="sm" />
                    <Box w="14px" h="14px" bg={fillColors[2]} borderRadius="sm" />
                    <Box w="14px" h="14px" bg={fillColors[3]} borderRadius="sm" />
                    <Text>More</Text>
                  </HStack>
                </Card>


              </TabPanel>
              
              {/* TAB 2: HOBBIES */}
              <TabPanel p={0}>
                <Box animation={`${fadeIn} 0.5s ease-out forwards`}>
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={6} color={textColor}>Hobbies & Interests</Text>
                  
                  <Grid templateColumns={{ base: "1fr", md: "1fr", lg: "1.3fr 1fr" }} gap={6} mb={8} alignItems="stretch">
                    
                    {/* VALORANT GAMEPLAY VIDEO */}
                    <GridItem w="full" display="flex" flexDirection="column">
                      <Card bg="black" borderRadius="xl" overflow="hidden" shadow="2xl" border="1px solid" borderColor="gray.800" h="100%" w="100%" _hover={{ shadow: "dark-lg", transform: "translateY(-2px)" }} transition="all 0.3s ease">
                        <HStack p={3} bg="gray.900" borderBottom="1px solid" borderColor="gray.800">
                          <Icon as={FiVideo} color="red.400" boxSize={4} />
                          <Text color="white" fontWeight="bold" fontSize="xs">Play Valorant</Text>
                        </HStack>
                        <Box flex="1" display="flex" alignItems="center" justifyContent="center" bg="black">
                          <AspectRatio ratio={16 / 9} w="100%">
                            <video controls autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                              <source src="/videos/valoclip.mp4" type="video/mp4" />
                              <iframe title="Valorant Clip" src="https://www.youtube.com/embed/e_E9W2vsRbQ?controls=1&mute=1" allowFullScreen />
                            </video>
                          </AspectRatio>
                        </Box>
                      </Card>
                    </GridItem>

                    {/* SPOTIFY MUSIC PLAYER UI */}
                    <GridItem w="full" minH="0" display="flex" flexDirection="column">
                      <Card bg="#181818" borderRadius="xl" shadow="2xl" color="white" border="1px solid" borderColor="gray.800" h="100%" display="flex" flexDirection="column" overflow="hidden" _hover={{ shadow: "dark-lg", transform: "translateY(-2px)" }} transition="all 0.3s ease">
                        <CardBody p={5} display="flex" flexDirection="column" h="100%">
                          
                          <Box flexShrink={0}>
                            <HStack mb={4} justify="space-between">
                              <HStack>
                                <Icon as={FiMusic} color="#1DB954" boxSize={4} />
                                <Text fontWeight="bold" fontSize="xs" color="#1DB954" letterSpacing="widest">MY TOP 4</Text>
                              </HStack>
                            </HStack>

                            <HStack spacing={4} mb={4}>
                              <Image 
                                src={playlist[currentSongIdx].cover} 
                                boxSize="50px" 
                                borderRadius="md" 
                                shadow="md" 
                                objectFit="cover" 
                                animation={isPlayingMusic ? `${fadeIn} 0.3s ease` : 'none'}
                              />
                              <Box overflow="hidden">
                                <Text fontWeight="black" fontSize="md" lineHeight="1.2" isTruncated>{playlist[currentSongIdx].title}</Text>
                                <Text fontSize="xs" color="gray.400" mt={1} isTruncated>{playlist[currentSongIdx].artist}</Text>
                              </Box>
                            </HStack>

                            {/* TIMESTAMPS ADDED HERE */}
                            <Box mb={4}>
                              <Slider value={musicProgress} aria-label="music-progress" focusThumbOnChange={false} isReadOnly size="sm">
                                <SliderTrack bg="gray.600">
                                  <SliderFilledTrack bg="#1DB954" />
                                </SliderTrack>
                                <SliderThumb boxSize={3} display="none" _groupHover={{ display: "block" }} />
                              </Slider>
                              <HStack justify="space-between" mt={1}>
                                <Text fontSize="10px" color="gray.400" fontWeight="medium">{formatTime(currentTimeDisplay)}</Text>
                                <Text fontSize="10px" color="gray.400" fontWeight="medium">{formatTime(durationDisplay)}</Text>
                              </HStack>
                            </Box>

                            <HStack justify="center" spacing={6} mb={4}>
                              <Icon as={FiSkipBack} boxSize={5} color="gray.400" cursor="pointer" _hover={{ color: "white" }} onClick={handlePrevSong} />
                              <Flex 
                                bg="white" color="black" w="40px" h="40px" borderRadius="full" 
                                align="center" justify="center" cursor="pointer"
                                _hover={{ transform: "scale(1.05)" }} transition="all 0.2s"
                                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                              >
                                <Icon as={isPlayingMusic ? FiPause : FiPlay} boxSize={5} ml={isPlayingMusic ? 0 : 1} />
                              </Flex>
                              <Icon as={FiSkipForward} boxSize={5} color="gray.400" cursor="pointer" _hover={{ color: "white" }} onClick={handleNextSong} />
                            </HStack>
                          </Box>

                          <Box 
                            flex="1" 
                            overflowY="auto" 
                            pr={2}
                            css={{
                              '&::-webkit-scrollbar': { width: '4px' },
                              '&::-webkit-scrollbar-track': { background: 'transparent' },
                              '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)', borderRadius: '4px' },
                              '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.4)' },
                            }}
                          >
                            <VStack align="stretch" spacing={2} pb={2}>
                              <Text fontSize="10px" fontWeight="bold" color="gray.400" textTransform="uppercase" mb={1} position="sticky" top={0} bg="#181818" zIndex={1} py={1}>Up Next</Text>
                              {playlist.map((song, idx) => (
                                <HStack 
                                  key={idx} 
                                  p={2} 
                                  borderRadius="md" 
                                  cursor="pointer"
                                  bg={currentSongIdx === idx ? "whiteAlpha.200" : "transparent"}
                                  _hover={{ bg: "whiteAlpha.100" }}
                                  onClick={() => {
                                    setCurrentSongIdx(idx);
                                    setIsPlayingMusic(true);
                                  }}
                                  transition="all 0.2s"
                                >
                                  <Text fontSize="xs" color={currentSongIdx === idx ? "#1DB954" : "gray.400"} w="16px">
                                    {currentSongIdx === idx && isPlayingMusic ? (
                                      <Icon as={FiPlay} color="#1DB954" />
                                    ) : (
                                      idx + 1
                                    )}
                                  </Text>
                                  <Box>
                                    <Text fontSize="sm" fontWeight={currentSongIdx === idx ? "bold" : "normal"} color={currentSongIdx === idx ? "#1DB954" : "white"} isTruncated>{song.title}</Text>
                                    <Text fontSize="xs" color="gray.500" isTruncated>{song.artist}</Text>
                                  </Box>
                                </HStack>
                              ))}
                            </VStack>
                          </Box>

                        </CardBody>
                      </Card>
                    </GridItem>
                  </Grid>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}

// Mount React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);