// Icons.jsx
// Re-export commonly used icons from react-icons

import { 
  HiEnvelope,
  HiChatBubbleLeftRight,
  HiSun,
  HiMoon,
  HiCheckBadge,
  HiChevronUp,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiBriefcase,
  HiCalendar,
  HiMicrophone,
  HiComputerDesktop,
  HiCodeBracket,
  HiCircleStack,
  HiWrenchScrewdriver,
  HiCog6Tooth,
  HiUser,
  HiEye,
  HiHeart,
  HiOutlineHeart,
  HiMapPin
} from 'react-icons/hi2'

import { 
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaRocket,
  FaTrophy,
  FaGlobe,
  FaMicrosoft,
  FaStar,
  FaArrowUpRightFromSquare,
  FaFolder
} from 'react-icons/fa6'

import { 
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiPython,
  SiC,
  SiCplusplus,
  SiDotnet,
  SiNodedotjs,
  SiLaravel,
  SiComposer,
  SiReact,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiGithub,
  SiMapbox,
  SiDiscord,
  SiPostman,
  SiPycharm,
  SiAndroidstudio,
  SiShopify
} from 'react-icons/si'

// ---------------------
// General Icons
// ---------------------
export const EmailIcon = HiEnvelope
export const MessageIcon = HiChatBubbleLeftRight
export const SunIcon = HiSun
export const MoonIcon = HiMoon
export const VerifiedIcon = HiCheckBadge
export const ChevronUpIcon = HiChevronUp
export const ChevronDownIcon = HiChevronDown
export const ChevronLeftIcon = HiChevronLeft
export const ChevronRightIcon = HiChevronRight
export const BriefcaseIcon = HiBriefcase
export const CalendarIcon = HiCalendar
export const MicrophoneIcon = HiMicrophone
export const MonitorIcon = HiComputerDesktop
export const CodeIcon = HiCodeBracket
export const DatabaseIcon = HiCircleStack
export const ToolIcon = HiWrenchScrewdriver
export const SettingsIcon = HiCog6Tooth
export const UserIcon = HiUser
export const EyeIcon = HiEye
export const HeartIcon = HiHeart
export const HeartOutlineIcon = HiOutlineHeart
export const RocketIcon = FaRocket
export const TrophyIcon = FaTrophy
export const GlobeIcon = FaGlobe
export const StarIcon = FaStar
export const ExternalLinkIcon = FaArrowUpRightFromSquare
export const FolderIcon = FaFolder
export const LocationIcon = HiMapPin

// ---------------------
// Social Icons
// ---------------------
export const GithubIcon = FaGithub
export const LinkedInIcon = FaLinkedin
export const FacebookIcon = FaFacebook

// ---------------------
// Technology icon mapper
// ---------------------
export const getTechIcon = (tech) => {
  const iconMap = {
    // Languages
    'C': SiC,
    'C++': SiCplusplus,
    'C#': SiDotnet,
    'Asp.Net': SiDotnet,
    'PHP': SiPhp,
    'JS': SiJavascript,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'Python': SiPython,

    // Frameworks
    'Laravel': SiLaravel,
    'Composer': SiComposer,
    'React native': SiReact,
    'Liquid (Shopify)': SiShopify,

    // Databases
    'Mysql': SiMysql,
    'Postgres': SiPostgresql,
    'Firebase': SiFirebase,

    // Tools
    'Node': SiNodedotjs,
    'Github': SiGithub,
    'Git': SiGithub,
    'VsCode': HiComputerDesktop,           // fallback
    'Visual Studio 2019': HiComputerDesktop, // fallback
    'Mapbox': SiMapbox,
    'Discord': SiDiscord,
    'Postman': SiPostman,
    'Ms Teams': FaMicrosoft,
    'Pycharm': SiPycharm,
    'Android Studio': SiAndroidstudio,
    'Oracle Virtual Box': HiComputerDesktop,
  }

  return iconMap[tech] || HiCodeBracket
}
