type Collection = {
  [key: string]: () => JSX.Element
}

import { Empty } from './Empty';
import { Microsoft } from './microsoft';
import { Google } from './google';
import { Discord } from './discord';

import { ChatGPT } from './chat-gpt';
import { DiscordSimple } from './discord-simple';
import { Facebook } from './facebook';
import { Github } from './github';
import { Instagram } from './instagram';
import { LinkedIn } from './linkedin';
import { Reddit } from './reddit';
import { Telegram } from './telegram';
import { Twitter } from './twitter';
import { VK } from './vk';
import { Youtube } from './youtube';


const Collection = {
  'empty': Empty,
  'microsoft': Microsoft,
  'google': Google, 
  'discord': Discord,
  'discord-simple': DiscordSimple,
  'chatgpt': ChatGPT,
  'facebook': Facebook,
  'github': Github,
  'instagram': Instagram,
  'linkedin': LinkedIn,
  'reddit': Reddit,
  'telegram': Telegram,
  'twitter': Twitter,
  'vk': VK,
  'youtube': Youtube
}


export default Collection;