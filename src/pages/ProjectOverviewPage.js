import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Image,
  Wrap,
} from '@chakra-ui/react';
import { ArrowLeft, Layers, Zap, Calendar, CheckCircle2 } from 'lucide-react';
import { featuredProjects } from '../data';

export default function ProjectOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = featuredProjects.find((item) => item.id === id);
  const cardBg = '#FFFFFF';
  const borderColor = '#E0E0E0';
  const textColor = '#121212';
  const mutedText = '#666666';
  const pageBg = '#F9F9F9';

  if (!project) {
    return (
      <Box minH="100vh" bg={pageBg} color={textColor} py={10} px={{ base: 4, md: 8 }}>
        <Container maxW="5xl">
          <Card bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`} p={6}>
            <Text color={mutedText}>Project not found. Please return to the projects list.</Text>
            <Button mt={6} bg="#121212" color="white" _hover={{ bg: '#333333' }} onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minH="100vh" bg={pageBg} color={textColor} pt={10} pb={6} px={{ base: 4, md: 8 }}>
      <Container flex="1" maxW="7xl">
        <Stack spacing={8}>
          <Box>
            <Box as="span" cursor="pointer" onClick={() => navigate('/projects') } _hover={{ textDecoration: 'underline', opacity: 0.8 }}>
              <HStack spacing={2}>
                <ArrowLeft size={18} color="#121212" />
                <Text color={textColor} fontWeight="bold">Back to Projects</Text>
              </HStack>
            </Box>
          </Box>

          <Box p={6} bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`}>
            <Heading color={textColor} mb={2}>{project.title}</Heading>
            <Text color={mutedText} fontSize="lg">{project.desc}</Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', xl: '360px 1fr' }} gap={8}>
            <Stack spacing={6}>
              <Card bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`} p={6}>
                <Stack spacing={4}>
                  <Heading size="md" color={textColor}>Project Overview</Heading>
                  <HStack spacing={3}><Zap size={18} color="#121212" /><Text fontWeight="600" color={textColor}>Role:</Text><Text color={mutedText}>{project.role}</Text></HStack>
                  <HStack spacing={3}><Layers size={18} color="#121212" /><Text fontWeight="600" color={textColor}>Type:</Text><Text color={mutedText}>Internship Project</Text></HStack>
                  <HStack spacing={3}><Calendar size={18} color="#121212" /><Text fontWeight="600" color={textColor}>Duration:</Text><Text color={mutedText}>{project.duration}</Text></HStack>
                  <HStack spacing={3} alignItems="center">
                    <CheckCircle2 size={18} color="#121212" />
                    <Text fontWeight="600" color={textColor}>Status:</Text>
                    <Badge variant="outline" borderColor="#121212" color="#121212" bg="transparent" px={3} py={1}>
                      {project.status}
                    </Badge>
                  </HStack>
                </Stack>
              </Card>

              <Card bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`} p={6}>
                <Stack spacing={4}>
                  <Heading size="md" color={textColor}>Tech Stack</Heading>
                  <Wrap>
                    <Badge variant="outline" borderColor="#121212" color="#121212" bg="transparent">Frontend</Badge>
                    <Badge variant="outline" borderColor="#121212" color="#121212" bg="transparent">Backend</Badge>
                    <Badge variant="outline" borderColor="#121212" color="#121212" bg="transparent">Database</Badge>
                    <Badge variant="outline" borderColor="#121212" color="#121212" bg="transparent">Integrations</Badge>
                  </Wrap>
                  <Box>
                    <Text fontWeight="600" color={textColor}>Frontend</Text>
                    <Text color={mutedText}>{project.tech.replace(' / ', ', ')}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="600" color={textColor}>Backend</Text>
                    <Text color={mutedText}>Node.js, Express, MongoDB</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="600" color={textColor}>Database</Text>
                    <Text color={mutedText}>MongoDB</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="600" color={textColor}>Integrations</Text>
                    <Text color={mutedText}>API-driven workflows, responsive UI patterns</Text>
                  </Box>
                </Stack>
              </Card>

              <Card bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`} p={6}>
                <Stack spacing={4}>
                  <Heading size="md" color={textColor}>Core Features</Heading>
                  <List spacing={3}>
                    {project.features.map((feature) => (
                      <ListItem key={feature}>
                        <HStack align="start" spacing={3}>
                          <Box mt={1} w={2} h={2} bg="#121212" borderRadius="full" />
                          <Text color={mutedText}>{feature}</Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Card>
            </Stack>

            <Stack spacing={6}>
              <Card bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`} p={6}>
                <Heading size="md" color={textColor} mb={3}>Detailed Overview</Heading>
                <Text color={mutedText} lineHeight="tall">{project.overview}</Text>
              </Card>

              <Card bg={cardBg} borderRadius="lg" border={`1px solid ${borderColor}`} p={6}>
                <Heading size="md" color={textColor} mb={3}>Outcome and Impact</Heading>
                <Text color={mutedText} lineHeight="tall">{project.impact}</Text>
              </Card>

              <Box>
                <Heading size="md" color={textColor} mb={4}>Screenshots</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  {project.screenshots.map((screenshot) => (
                    <Card key={screenshot.caption} bg={cardBg} borderRadius="md" border={`1px solid ${borderColor}`} overflow="hidden">
                      <Image src={screenshot.src} alt={screenshot.caption} objectFit="cover" h="220px" w="100%" />
                      <CardBody>
                        <Text color={mutedText} fontSize="sm">{screenshot.caption}</Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>
            </Stack>
          </Grid>
        </Stack>
      </Container>
      <Box mt={6} py={6} textAlign="center" borderTop={`1px solid ${borderColor}`} color={mutedText} bg={pageBg}>
        <Container maxW="7xl">
          <Text fontSize="sm">(c) 2026 Vincent Louise Collamat. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
}
