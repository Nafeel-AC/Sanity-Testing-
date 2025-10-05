import { Instagram, Linkedin } from "lucide-react";
import TikTokIcon from "./TikTokIcon";
import CustomYouTubeIcon from "./CustomYouTubeIcon";
import CustomFacebookIcon from "./CustomFacebookIcon";
import CustomXIcon from "./CustomXIcon";
import CustomTelegramIcon from "./CustomTelegramIcon";

interface SocialIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const InstagramIcon = ({ className = "", size = 16 }: SocialIconProps) => (
  <Instagram className={className} size={size} />
);

export const YouTubeIcon = ({ className = "", size = 16 }: SocialIconProps) => (
  <CustomYouTubeIcon className={className} width={size} height={size} />
);

export const TikTokSocialIcon = ({ className = "", size = 16 }: SocialIconProps) => (
  <TikTokIcon className={className} width={size} height={size} />
);

export const FacebookIcon = ({ className = "", size = 16 }: SocialIconProps) => (
  <CustomFacebookIcon className={className} width={size} height={size} />
);

export const XIcon = ({ className = "", size = 16 }: SocialIconProps) => (
  <CustomXIcon className={className} width={size} height={size} />
);

export const TelegramIcon = ({ className = "", size = 16, color }: SocialIconProps) => (
  <CustomTelegramIcon className={className} width={size} height={size} style={color ? { color } : undefined} />
);

export const LinkedInIcon = ({ className = "", size = 16, color }: SocialIconProps) => (
  <Linkedin className={className} size={size} style={color ? { color } : undefined} />
);

// Standardized social platform data
export const socialPlatforms = [
  {
    name: "Instagram",
    value: "instagram",
    icon: InstagramIcon,
    href: "/instagram",
    color: "from-pink-500 to-orange-500",
    bgColor: "bg-pink-500",
    hoverColor: "hover:bg-pink-600"
  },
  {
    name: "TikTok",
    value: "tiktok",
    icon: TikTokSocialIcon,
    href: "/tiktok",
    color: "from-black to-gray-800",
    bgColor: "bg-black",
    hoverColor: "hover:bg-gray-800"
  },
  {
    name: "YouTube",
    value: "youtube",
    icon: YouTubeIcon,
    href: "/youtube",
    color: "from-red-600 to-red-700",
    bgColor: "bg-red-600",
    hoverColor: "hover:bg-red-600"
  },
  {
    name: "Facebook",
    value: "facebook",
    icon: FacebookIcon,
    href: "/facebook",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-600",
    hoverColor: "hover:bg-blue-600"
  },
  {
    name: "X",
    value: "twitter", 
    icon: XIcon,
    href: "/twitter",
    color: "from-black to-gray-800",
    bgColor: "bg-slate-800",
    hoverColor: "hover:bg-slate-900"
  },
  {
    name: "LinkedIn",
    value: "linkedin",
    icon: LinkedInIcon,
    href: "/linkedin",
    color: "from-[#0A66C2] to-[#084c94]",
    bgColor: "bg-[#0A66C2]",
    hoverColor: "hover:bg-[#084c94]"
  },
  {
    name: "Telegram",
    value: "telegram",
    icon: TelegramIcon,
    href: "/telegram",
    color: "from-[#229ED9] to-[#1a7aaa]",
    bgColor: "bg-[#229ED9]",
    hoverColor: "hover:bg-[#1a7aaa]"
  }
];

export default {
  InstagramIcon,
  YouTubeIcon,
  TikTokSocialIcon,
  FacebookIcon,
  XIcon,
  LinkedInIcon,
  TelegramIcon,
  socialPlatforms
};