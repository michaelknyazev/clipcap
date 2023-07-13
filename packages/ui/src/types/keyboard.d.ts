/**
 * Represents keys on the numeric keypad.
 */
export declare type TKeyboardKeyNumericKeypad = "Decimal" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "Multiply" | "Add" | "Subtract" | "Divide" | "Separator"
/**
 * Represents uppercase alphabetical keys.
 */
export declare type TKeyboardKeyUppercase =  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
/**
 * Represents lowercase alphabetical keys.
 */
export declare type TKeyboardKeyLowercase =  'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
/**
 * Represents modifier keys.
 */
export declare type TKeyboardKeyModifier = "Alt" | "AltGraph" | "CapsLock" | "Control" | "Fn" | "FnLock" | "Hyper" | "Meta" | "NumLock" | "ScrollLock" | "Shift" | "Super" | "Symbol" | "SymbolLock"
/**
 * Represents whitespace keys.
 */
export declare type TKeyboardKeyWhitespace = "Enter" | "Tab" | " "
/**
 * Represents navigation keys.
 */
export declare type TKeyboardKeyNavigation = "ArrowDown" | "ArrowLeft" | "ArrowRight" | "ArrowUp" | "End" | "Home" | "PageDown" | "PageUp"
/**
 * Represents editing keys.
 */
export declare type TKeyboardKeyEditing = "Backspace" | "Clear" | "Copy" | "CrSel" | "Cut" | "Delete" | "EraseEof" | "ExSel" | "Insert" | "Paste" | "Redo" | "Undo"
/**
 * Represents UI keys.
 */
export declare type TKeyboardKeyUI =  "Accept" | "Again" | "Attn" | "Cancel" | "ContextMenu" | "Escape" | "Execute" | "Find" | "Finish" | "Help" | "Pause" | "Play" | "Props" | "Select" | "ZoomIn" | "ZoomOut"
/**
 * Represents Device keys.
 */
export declare type TKeyboardKeyDevice = "BrightnessDown" | "BrightnessUp" | "Eject" | "LogOff" | "Power" | "PowerOff" | "PrintScreen" | "Hibernate" | "Standby" | "WakeUp"
/**
 * Represents IME keys.
 */
export declare type TKeyboardKeyIMEComposition = "AllCandidates" | "Alphanumeric" | "CodeInput" | "Compose" | "Convert" | "Dead" | "FinalMode" | "GroupFirst" | "GroupLast" | "GroupNext" | "GroupPrevious" | "ModeChange" | "NextCandidate" | "NonConvert" | "PreviousCandidate" | "Process" | "SingleCandidate"
/**
 * Represents Linux Dead keys.
 */
export declare type TKeyboardKeyLinuxDead = "GDK_KEY_dead_grave" | "GDK_KEY_dead_acute" | "GDK_KEY_dead_circumflex" | "GDK_KEY_dead_tilde" | "GDK_KEY_dead_perispomeni" | "GDK_KEY_dead_macron" | "GDK_KEY_dead_breve" | "GDK_KEY_dead_abovedot" | "GDK_KEY_dead_diaeresis" | "GDK_KEY_dead_abovering" | "GDK_KEY_dead_doubleacute" | "GDK_KEY_dead_caron" | "GDK_KEY_dead_cedilla" | "GDK_KEY_dead_ogonek" | "GDK_KEY_dead_iota" | "GDK_KEY_dead_voiced_sound" | "GDK_KEY_dead_semivoiced_sound" | "GDK_KEY_dead_belowdot" | "GDK_KEY_dead_hook" | "GDK_KEY_dead_horn" | "GDK_KEY_dead_stroke" | "GDK_KEY_dead_abovecomma" | "GDK_KEY_dead_psili" | "GDK_KEY_dead_abovereversedcomma" | "GDK_KEY_dead_dasia" | "GDK_KEY_dead_doublegrave" | "GDK_KEY_dead_belowring" | "GDK_KEY_dead_belowmacron" | "GDK_KEY_dead_belowcircumflex" | "GDK_KEY_dead_belowtilde" | "GDK_KEY_dead_belowbreve" | "GDK_KEY_dead_belowdiaeresis" | "GDK_KEY_dead_invertedbreve" | "GDK_KEY_dead_belowcomma" | "GDK_KEY_dead_currency" | "GDK_KEY_dead_a" | "GDK_KEY_dead_A" | "GDK_KEY_dead_e" | "GDK_KEY_dead_E" | "GDK_KEY_dead_i" | "GDK_KEY_dead_I" | "GDK_KEY_dead_o" | "GDK_KEY_dead_O" | "GDK_KEY_dead_u" | "GDK_KEY_dead_U" | "GDK_KEY_dead_small_schwa" | "GDK_KEY_dead_capital_schwa" | "GDK_KEY_dead_greek"
/**
 * Represents Function keys.
 */
export declare type TKeyboardKeyFunction =  "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "F13" | "F14" | "F15" | "F16" | "F17" | "F18" | "F19" | "F20" | "Soft1" | "Soft2" | "Soft3" | "Soft4"
/**
 * Represents Phone  keys.
 */
export declare type TKeyboardKeyPhone = "AppSwitch" | "Call" | "Camera" | "CameraFocus" | "EndCall" | "GoBack" | "GoHome" | "HeadsetHook" | "LastNumberRedial" | "Notification" | "MannerMode" | "VoiceDial"
export declare type TKeyboardKeyMultimedia = "ChannelDown" | "ChannelUp" | "MediaFastForward" | "MediaPause" | "MediaPlay" | "MediaPlayPause" | "MediaRecord" | "MediaRewind" | "MediaStop" | "MediaTrackNext" | "MediaTrackPrevious"
export declare type TKeyboardKeyTVControl = "TV" | "TV3DMode" | "TVAntennaCable" | "TVAudioDescription" | "TVAudioDescriptionMixDown" | "TVAudioDescriptionMixUp" | "TVContentsMenu" | "TVDataService" | "TVInput" | "TVInputComponent1" | "TVInputComponent2" | "TVInputComposite1" | "TVInputComposite2" | "TVInputHDMI1" | "TVInputHDMI2" | "TVInputHDMI3" | "TVInputHDMI4" | "TVInputVGA1" | "TVMediaContext" | "TVNetwork" | "TVNumberEntry" | "TVPower" | "TVRadioService" | "TVSatellite" | "TVSatelliteBS" | "TVSatelliteCS" | "TVSatelliteToggle" | "TVTerrestrialAnalog" | "TVTerrestrialDigital" | "TVTimer"
export declare type TKeyboardKeyMediaControl = "AVRInput" | "AVRPower" | "ColorF0Red" | "ColorF1Green" | "ColorF2Yellow" | "ColorF3Blue" | "ColorF4Grey" | "ColorF5Brown" | "ClosedCaptionToggle" | "Dimmer" | "DisplaySwap" | "DVR" | "Exit" | "FavoriteClear0" | "FavoriteClear1" | "FavoriteClear2" | "FavoriteClear3" | "FavoriteRecall0" | "FavoriteRecall1" | "FavoriteRecall2" | "FavoriteRecall3" | "FavoriteStore0" | "FavoriteStore1" | "FavoriteStore2" | "FavoriteStore3" | "Guide" | "GuideNextDay" | "GuidePreviousDay" | "Info" | "InstantReplay" | "Link" | "ListProgram" | "LiveContent" | "Lock" | "MediaApps" | "MediaAudioTrack" | "MediaLast" | "MediaSkipBackward" | "MediaSkipForward" | "MediaStepBackward" | "MediaStepForward" | "MediaTopMenu" | "NavigateIn" | "NavigateNext" | "NavigateOut" | "NavigatePrevious" | "NextFavoriteChannel" | "NextUserProfile" | "OnDemand" | "Pairing" | "PinPDown" | "PinPMove" | "PinPToggle" | "PinPUp" | "PlaySpeedDown" | "PlaySpeedReset" | "PlaySpeedUp" | "RandomToggle" | "RcLowBattery" | "RecordSpeedNext" | "RfBypass" | "ScanChannelsToggle" | "ScreenModeNext" | "Settings" | "SplitScreenToggle" | "STBInput" | "STBPower" | "Subtitle" | "Teletext" | "VideoModeNext" | "Wink" | "ZoomToggle"
export declare type TKeyboardKeySpeechRecognition = "SpeechCorrectionList" | "SpeechInputToggle"
export declare type TKeyboardKeyDocument = "Close" | "New" | "Open" | "Print" | "Save" | "SpellCheck" | "MailForward" | "MailReply" | "MailSend"
export declare type TKeyboardKeyApplicationSelector = "LaunchCalculator" | "LaunchCalendar" | "LaunchContacts" | "LaunchMail" | "LaunchMediaPlayer" | "LaunchMusicPlayer" | "LaunchMyComputer" | "LaunchPhone" | "LaunchScreenSaver" | "LaunchSpreadsheet" | "LaunchWebBrowser" | "LaunchWebCam" | "LaunchWordProcessor" | "LaunchApplication1" | "LaunchApplication2" | "LaunchApplication3" | "LaunchApplication4" | "LaunchApplication5" | "LaunchApplication6" | "LaunchApplication7" | "LaunchApplication8" | "LaunchApplication9" | "LaunchApplication10" | "LaunchApplication11" | "LaunchApplication12" | "LaunchApplication13" | "LaunchApplication14" | "LaunchApplication15" | "LaunchApplication16"
export declare type TKeyboardKeyBrowserControl = "BrowserBack" | "BrowserFavorites" | "BrowserForward" | "BrowserHome" | "BrowserRefresh" | "BrowserSearch" | "BrowserStop"
export declare type TKeyboardKeyKorean = "HangulMode" | "HanjaMode" | "JunjaMode"

/**
 * @deprecated: Use " "
 *
 * Represents the deprecated whitespace key.
 */
export declare type TKeyboardKeySpacebar = "Spacebar"

/**
 * Represents a key value when no other key can be identified.
 */
export declare type TKeyboardKeySpecial = "Unknown"

/**
 * Represents custom key values.
 */
export declare type TKeyboardKeyCustom = string

/**
 * Represents all possible key values that can be in event.key (KeyboardEvent.key)
 * 
 * @example:
 *  const CapsLockKey: TKeyboardKey = "CapsLock"
 *  const ModifierKey: TKeyboardKeyModifier = "Control"
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#editing_keys
 */
export declare type TKeyboardKey = TKeyboardKeySpacebar | TKeyboardKeySpecial | TKeyboardKeyModifier | TKeyboardKeyWhitespace | TKeyboardKeyNavigation | TKeyboardKeyEditing | TKeyboardKeyUI | TKeyboardKeyDevice | TKeyboardKeyIMEComposition | TKeyboardKeyLinuxDead | TKeyboardKeyFunction | TKeyboardKeyPhone | TKeyboardKeyMultimedia | TKeyboardKeyTVControl | TKeyboardKeyMediaControl | TKeyboardKeySpeechRecognition | TKeyboardKeyDocument | TKeyboardKeyApplicationSelector | TKeyboardKeyBrowserControl | TKeyboardKeyNumericKeypad | TKeyboardKeyUppercase | TKeyboardKeyLowercase | TKeyboardKeyKorean | TKeyboardKeyCustom
