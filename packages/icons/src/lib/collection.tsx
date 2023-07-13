type Collection = {
  [key: string]: () => JSX.Element
}

import { OutlinedAlignCenter } from './Outlined-Align-Center';
import { OutlinedAlignLeft } from './Outlined-Align-Left';
import { OutlinedAlignRight } from './Outlined-Align-Right';
import { OutlinedArrowDown16px } from './Outlined-Arrow-Down-16px';
import { OutlinedArrowDown } from './Outlined-Arrow-Down';
import { OutlinedArrowLeft } from './Outlined-Arrow-Left';
import { OutlinedArrowRight } from './Outlined-Arrow-Right';
import { OutlinedArrowUp16px } from './Outlined-Arrow-Up-16px';
import { OutlinedArrowUp } from './Outlined-Arrow-Up';
import { OutlinedBell } from './Outlined-Bell';
import { OutlinedBold } from './Outlined-Bold';
import { OutlinedBookmark } from './Outlined-Bookmark';
import { OutlinedBurger } from './Outlined-Burger';
import { OutlinedCalendar16px } from './Outlined-Calendar-16px';
import { OutlinedCalendar } from './Outlined-Calendar';
import { OutlinedCheckmark } from './Outlined-Checkmark';
import { OutlinedClock16px } from './Outlined-Clock-16px';
import { OutlinedComment16px } from './Outlined-Comment-16px';
import { OutlinedCopy } from './Outlined-Copy';
import { OutlinedCross16px } from './Outlined-Cross-16px';
import { OutlinedCross } from './Outlined-Cross';
import { OutlinedEdit } from './Outlined-Edit';
import { OutlinedEnvelope } from './Outlined-Envelope';
import { OutlinedFileDraft } from './Outlined-File-Draft';
import { OutlinedFileText } from './Outlined-File-Text';
import { OutlinedFlash } from './Outlined-Flash';
import { OutlinedFolderAdd } from './Outlined-Folder-Add';
import { OutlinedFolderSelected } from './Outlined-Folder-Selected';
import { OutlinedFolder } from './Outlined-Folder';
import { OutlinedFolders } from './Outlined-Folders';
import { OutlinedItalic } from './Outlined-Italic';
import { OutlinedKey } from './Outlined-Key';
import { OutlinedLink } from './Outlined-Link';
import { OutlinedListNumeric } from './Outlined-List-Numeric';
import { OutlinedList } from './Outlined-List';
import { OutlinedLock } from './Outlined-Lock';
import { OutlinedMessage } from './Outlined-Message';
import { OutlinedMore } from './Outlined-More';
import { OutlinedPathfinder } from './Outlined-Pathfinder';
import { OutlinedPencil16px } from './Outlined-Pencil-16px';
import { OutlinedPencil } from './Outlined-Pencil';
import { OutlinedQuotationMarks } from './Outlined-Quotation-Marks';
import { OutlinedSearchSimple } from './Outlined-Search-Simple';
import { OutlinedSearch16px } from './Outlined-Search-16px';
import { OutlinedSearch } from './Outlined-Search';
import { OutlinedSettingsAlt } from './Outlined-Setings-Alt';
import { OutlinedSignOut } from './Outlined-Sign-Out';
import { OutlinedSliders } from './Outlined-Sliders';
import { OutlinedStar16px } from './Outlined-Star-16px';
import { OutlinedStar } from './Outlined-Star';
import { OutlinedTag } from './Outlined-Tag';
import { OutlinedText } from './Outlined-Text';
import { OutlinedTrash } from './Outlined-Trash';
import { OutlinedUserCircle } from './Outlined-User-Circle';
import { OutlinedUser } from './Outlined-User';
import { OutlinedUsers } from './Outlined-Users';
import { OutlinedVerticalAlignBottom } from './Outlined-Vertical-Align-Bottom';
import { OutlinedVideo } from './Outlined-Video';
import { OutlinedWhiteboard } from './Outlined-Whiteboard';
import { OutlinedAnalytics } from './Outlined-Analytics';
import { OutlinedFlag } from './Outlined-Flag';

import { SolidAdd16px } from './solid-add-16px';
import { SolidAdd } from './solid-add';
import { SolidBell } from './solid-bell';
import { SolidBookmark } from './solid-bookmark';
import { SolidBubble16px } from './solid-bubble-16px';
import { SolidCaretRight16px } from './solid-caret-right-16px';
import { SolidCaretRight } from './solid-caret-right';
import { SolidClock } from './solid-clock';
import { SolidCommentAdd } from './solid-comment-add';
import { SolidDropdown12px } from './solid-dropdown-12px';
import { SolidEdit } from './solid-edit';
import { SolidEnvelope } from './solid-envelope';
import { SolidFileDraft } from './solid-file-draft';
import { SolidFileText } from './solid-file-text';
import { SolidFolderAdd } from './solid-folder-add';
import { SolidFolderSelected } from './solid-folder-selected';
import { SolidFolder } from './solid-folder';
import { SolidFolders } from './solid-folders';
import { SolidKey } from './solid-key';
import { SolidLock } from './solid-lock';
import { SolidMessage } from './solid-message';
import { SolidPlay } from './solid-play';
import { SolidQuotationMarks } from './solid-quotation-marks';
import { SolidSettingsAlt } from './solid-setings-alt';
import { SolidStar16px } from './solid-star-16px';
import { SolidStar } from './solid-star';
import { SolidTag } from './solid-tag';
import { SolidTrash } from './solid-trash';
import { SolidUser } from './solid-user';
import { SolidUsers } from './solid-users';
import { SolidVerticalAlignBottom } from './solid-vertical-align-bottom';
import { SolidVolumeUp } from "./solid-volume-up";
import { SolidMinus } from './solid-minus';

import { Empty } from './Empty';
import { ArrowLeft } from './arrow-left';
import { Microsoft } from './microsoft';
import { Google } from './google';
import { Loading } from './loading';
import { Camera } from './camera';
import { Lightning } from './lightning';

const Collection = {
  'empty': Empty,
  'microsoft': Microsoft,
  'google': Google,
  'arrow-left': ArrowLeft,
  'loading': Loading,
  'camera': Camera,
  'lightning': Lightning,
  "outlined-align-center": OutlinedAlignCenter,
  "outlined-align-left": OutlinedAlignLeft,
  "outlined-align-right": OutlinedAlignRight,
  "outlined-arrow-down-16px": OutlinedArrowDown16px,
  "outlined-arrow-down": OutlinedArrowDown,
  "outlined-arrow-left": OutlinedArrowLeft,
  "outlined-arrow-right": OutlinedArrowRight,
  "outlined-arrow-up-16px": OutlinedArrowUp16px,
  "outlined-arrow-up": OutlinedArrowUp,
  "outlined-bell": OutlinedBell,
  "outlined-bold": OutlinedBold,
  "outlined-bookmark": OutlinedBookmark,
  "outlined-burger": OutlinedBurger,
  "outlined-calendar-16px": OutlinedCalendar16px,
  "outlined-calendar": OutlinedCalendar,
  "outlined-checkmark": OutlinedCheckmark,
  "outlined-clock-16px": OutlinedClock16px,
  "outlined-comment-16px": OutlinedComment16px,
  "outlined-copy": OutlinedCopy,
  "outlined-cross-16px": OutlinedCross16px,
  "outlined-cross": OutlinedCross,
  "outlined-edit": OutlinedEdit,
  "outlined-envelope": OutlinedEnvelope,
  "outlined-file-draft": OutlinedFileDraft,
  "outlined-file-text": OutlinedFileText,
  "outlined-flash": OutlinedFlash,
  "outlined-folder-add": OutlinedFolderAdd,
  "outlined-folder-selected": OutlinedFolderSelected,
  "outlined-folder": OutlinedFolder,
  "outlined-folders": OutlinedFolders,
  "outlined-italic": OutlinedItalic,
  "outlined-key": OutlinedKey,
  "outlined-link": OutlinedLink,
  "outlined-list-numeric": OutlinedListNumeric,
  "outlined-list": OutlinedList,
  "outlined-lock": OutlinedLock,
  "outlined-message": OutlinedMessage,
  "outlined-more": OutlinedMore,
  "outlined-pathfinder": OutlinedPathfinder,
  "outlined-pencil-16px": OutlinedPencil16px,
  "outlined-pencil": OutlinedPencil,
  "outlined-quotation-marks": OutlinedQuotationMarks,
  "outlined-search-simple": OutlinedSearchSimple,
  "outlined-search-16px": OutlinedSearch16px,
  "outlined-search": OutlinedSearch,
  "outlined-settings-alt": OutlinedSettingsAlt,
  "outlined-sign-out": OutlinedSignOut,
  "outlined-sliders": OutlinedSliders,
  "outlined-star-16px": OutlinedStar16px,
  "outlined-star": OutlinedStar,
  "outlined-tag": OutlinedTag,
  "outlined-text": OutlinedText,
  "outlined-trash": OutlinedTrash,
  "outlined-user-circle": OutlinedUserCircle,
  "outlined-user": OutlinedUser,
  "outlined-users": OutlinedUsers,
  "outlined-vertical-align-bottom": OutlinedVerticalAlignBottom,
  "outlined-video": OutlinedVideo,
  "outlined-whiteboard": OutlinedWhiteboard,
  "outlined-analytics": OutlinedAnalytics,
  "outlined-flag": OutlinedFlag,
  "solid-add-16px": SolidAdd16px,
  "solid-add": SolidAdd,
  "solid-bell": SolidBell,
  "solid-bookmark": SolidBookmark,
  "solid-bubble-16px": SolidBubble16px,
  "solid-caret-right-16px": SolidCaretRight16px,
  "solid-caret-right": SolidCaretRight,
  "solid-clock": SolidClock,
  "solid-comment-add": SolidCommentAdd,
  "solid-dropdown-12px": SolidDropdown12px,
  "solid-edit": SolidEdit,
  "solid-envelope": SolidEnvelope,
  "solid-file-draft": SolidFileDraft,
  "solid-file-text": SolidFileText,
  "solid-folder-add": SolidFolderAdd,
  "solid-folder-selected": SolidFolderSelected,
  "solid-folder": SolidFolder,
  "solid-folders": SolidFolders,
  "solid-key": SolidKey,
  "solid-lock": SolidLock,
  "solid-message": SolidMessage,
  "solid-play": SolidPlay,
  "solid-quotation-marks": SolidQuotationMarks,
  "solid-settings-alt": SolidSettingsAlt,
  "solid-star-16px": SolidStar16px,
  "solid-star": SolidStar,
  "solid-tag": SolidTag,
  "solid-trash": SolidTrash,
  "solid-user": SolidUser,
  "solid-users": SolidUsers,
  "solid-vertical-align-bottom": SolidVerticalAlignBottom,
  "solid-volume-up": SolidVolumeUp,
  "solid-minus": SolidMinus
}


export default Collection;