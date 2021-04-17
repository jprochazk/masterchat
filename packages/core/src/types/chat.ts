import {
  YTAccessibilityLabel,
  YTAccessibilityData,
  YTReloadContinuation,
  YTResponseContext,
  YTBrowseEndpointContainer,
} from "./context";

// --------------------
// YT Interface
// --------------------

export type YTRun = YTTextRun | YTEmojiRun;

export interface YTRunContainer<T = YTRun> {
  runs: T[];
}

export interface YTTextRun {
  text: string;
  navigationEndpoint?: YTUrlEndpointContainer | YTBrowseEndpointContainer;
}

export interface YTEmojiRun {
  emoji: YTEmoji;
}

export interface YTEmoji {
  emojiId: string;
  shortcuts: string[];
  searchTerms: string[];
  image: YTTickerThumbnailClass;
  isCustomEmoji: boolean;
}

export interface YTUrlEndpointContainer {
  urlEndpoint: YTUrlEndpoint;
  commandMetadata: YTCommandMetadata;
  clickTrackingParams: string;
}

export interface YTUrlEndpoint {
  url: string;
  target: YTTarget | string;
  nofollow?: boolean;
}

export enum YTTarget {
  NewWindow = "TARGET_NEW_WINDOW",
}

export interface YTChatError {
  code: number;
  message: string;
  errors: YTChatErrorDetail[];
  status: YTChatErrorStatus;
}

export enum YTChatErrorStatus {
  Unavailable = "UNAVAILABLE",
  PermissionDenied = "PERMISSION_DENIED",
  Internal = "INTERNAL",
  Invalid = "INVALID_ARGUMENT",
  NotFound = "NOT_FOUND",
}

export interface YTChatResponse {
  responseContext: YTResponseContext;
  trackingParams: string;
  continuationContents?: YTContinuationContents;
  error?: YTChatError;
}

export interface YTChatErrorDetail {
  message: string;
  domain: "global";
  reason: "forbidden" | "backendError" | "badRequest" | "notFound";
}

export interface YTContinuationContents {
  liveChatContinuation: YTLiveChatContinuation;
}

export interface YTLiveChatContinuation {
  continuations: YTContinuationElement[];
  actions?: YTAction[];
  actionPanel?: YTActionPanel;
  itemList?: YTItemList;
  header?: YTLiveChatContinuationHeader;
  ticker?: YTTicker;
  trackingParams?: string;
  participantsList?: YTParticipantsList;
  popoutMessage?: YTPopoutMessage;
  clientMessages?: YTClientMessages;
}

export interface YTContinuationElement {
  timedContinuationData: YTTimedContinuationData;
}

export interface YTTimedContinuationData {
  timeoutMs: number;
  continuation: string;
  clickTrackingParams: string;
}

// Action and Commands

export interface YTReplayChatItemAction {
  actions: YTAction[];
}

export interface YTAction {
  clickTrackingParams: string;

  // Chat
  addChatItemAction?: YTAddChatItemAction;
  markChatItemsByAuthorAsDeletedAction?: YTMarkChatItemsByAuthorAsDeletedAction;
  markChatItemAsDeletedAction?: YTMarkChatItemAsDeletedAction;

  // Ticker
  addLiveChatTickerItemAction?: YTAddLiveChatTickerItemAction;

  // Banner
  addBannerToLiveChatCommand?: YTAddBannerToLiveChatCommand;
  removeBannerForLiveChatCommand?: YTRemoveBannerForLiveChatCommand;

  // Placeholder
  replaceChatItemAction: YTReplaceChatItemAction;

  showLiveChatTooltipCommand?: YTShowLiveChatTooltipCommand;
}

export interface YTAddChatItemAction {
  item:
    | YTLiveChatTextMessageRendererContainer
    | YTLiveChatPaidMessageRendererContainer
    | YTLiveChatPaidStickerRendererContainer
    | YTLiveChatMembershipItemRendererContainer
    | YTLiveChatPlaceholderItemRendererContainer
    | YTLiveChatViewerEngagementMessageRendererContainer;
  clientId?: string;
}

export interface YTAddLiveChatTickerItemAction {
  item: YTAddLiveChatTickerItem;
  durationSec: string;
}

export interface YTReplaceChatItemAction {
  targetItemId: string;
  replacementItem:
    | YTLiveChatPlaceholderItemRendererContainer
    | YTLiveChatTextMessageRendererContainer
    | YTLiveChatPaidMessageRendererContainer; // TODO: check if YTLiveChatPaidMessageRendererContainer will appear
}

export interface YTMarkChatItemAsDeletedAction {
  deletedStateMessage: YTRunContainer<YTTextRun>;
  targetItemId: string;
}

export interface YTMarkChatItemsByAuthorAsDeletedAction {
  deletedStateMessage: YTRunContainer<YTTextRun>;
  externalChannelId: string;
}

export interface YTAddBannerToLiveChatCommand {
  bannerRenderer: YTLiveChatBannerRendererContainer;
}

export interface YTRemoveBannerForLiveChatCommand {
  targetActionId: string;
}

// Containers

export interface YTLiveChatTextMessageRendererContainer {
  liveChatTextMessageRenderer: YTLiveChatTextMessageRenderer;
}

export interface YTLiveChatPaidMessageRendererContainer {
  liveChatPaidMessageRenderer: YTLiveChatPaidMessageRenderer;
}

export interface YTLiveChatPaidStickerRendererContainer {
  liveChatPaidStickerRenderer: YTLiveChatPaidStickerRenderer;
}

export interface YTLiveChatMembershipItemRendererContainer {
  liveChatMembershipItemRenderer: YTLiveChatMembershipItemRenderer;
}

export interface YTLiveChatPlaceholderItemRendererContainer {
  liveChatPlaceholderItemRenderer: YTLiveChatPlaceholderItemRenderer;
}

export interface YTLiveChatBannerRendererContainer {
  liveChatBannerRenderer: YTLiveChatBannerRenderer;
}

export interface YTLiveChatViewerEngagementMessageRendererContainer {
  liveChatViewerEngagementMessageRenderer: YTLiveChatViewerEngagementMessageRenderer;
}

export interface YTTooltipRendererContainer {
  tooltipRenderer: YTTooltipRenderer;
}

// LiveChat Renderers

export interface YTLiveChatTextMessageRenderer {
  id: string;
  timestampUsec: string;
  message: YTRunContainer;
  authorName: YTSimpleText;
  authorPhoto: YTThumbnails;
  authorExternalChannelId: string;

  authorBadges?: YTAuthorBadge[];

  // unavailable in banners
  contextMenuEndpoint?: YTLiveChatItemContextMenuEndpointContainer;
  contextMenuAccessibility?: YTAccessibilityData;
}

export interface YTLiveChatPaidMessageRenderer {
  id: string;
  timestampUsec: string;
  message?: YTRunContainer;
  authorName: YTSimpleText;
  authorPhoto: YTThumbnails;
  authorExternalChannelId: string;
  contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
  contextMenuAccessibility: YTAccessibilityData;

  purchaseAmountText: YTSimpleText;
  timestampColor: number;
  authorNameTextColor: number;
  headerBackgroundColor: number;
  headerTextColor: number;
  bodyBackgroundColor: number;
  bodyTextColor: number;
  trackingParams: string;
}

export interface YTLiveChatPaidStickerRenderer {
  id: string;
  contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
  contextMenuAccessibility: YTAccessibilityData;
  timestampUsec: string;
  authorPhoto: YTThumbnails;
  authorName: YTSimpleText;
  authorExternalChannelId: string;
  sticker: YTTickerThumbnailClass;
  moneyChipBackgroundColor: number;
  moneyChipTextColor: number;
  purchaseAmountText: YTSimpleText;
  stickerDisplayWidth: number;
  stickerDisplayHeight: number;
  backgroundColor: number;
  authorNameTextColor: number;
  trackingParams: string;
}

export interface YTLiveChatMembershipItemRenderer {
  id: string;
  timestampUsec: string;
  authorExternalChannelId: string;
  headerSubtext: YTRunContainer;
  authorName: YTSimpleText;
  authorPhoto: YTThumbnails;
  authorBadges: YTLiveChatAuthorBadgeRendererContainer[];
  contextMenuEndpoint: YTLiveChatItemContextMenuEndpointContainer;
  contextMenuAccessibility: YTAccessibilityData;
}

export interface YTLiveChatPlaceholderItemRenderer {
  id: string;
  timestampUsec: string;
}

export interface YTLiveChatBannerRenderer {
  actionId: string;
  targetId: string; // live-chat-banner
  contents: YTLiveChatTextMessageRendererContainer;
  header: YTLiveChatBannerRendererHeader;
  viewerIsCreator: boolean;
}

export interface YTLiveChatViewerEngagementMessageRenderer {
  id: string;
  timestampUsec: string;
  icon: YTIcon;
  message: YTRunContainer;
  actionButton: YTActionButtonRendererContainer;
}

export interface YTTooltipRenderer {
  promoConfig: YTPromoConfig;
  targetId: string;
  detailsText: YTRunContainer;
  suggestedPosition: YTType;
  dismissStrategy: YTType;
  trackingParams: string;
}

// Ticker Renderers

export interface YTAddLiveChatTickerItem {
  liveChatTickerPaidMessageItemRenderer?: YTLiveChatTickerPaidMessageItemRenderer; // Super Chat
  liveChatTickerPaidStickerItemRenderer?: YTLiveChatTickerPaidStickerItemRenderer; // Super Sticker
  liveChatTickerSponsorItemRenderer?: YTLiveChatTickerSponsorItemRenderer; // Membership Updates
}

export interface YTLiveChatTickerPaidMessageItemRenderer {
  id: string;
  amount: YTSimpleText;
  amountTextColor: number;
  startBackgroundColor: number;
  endBackgroundColor: number;
  authorPhoto: YTTickerThumbnailClass;
  durationSec: number;
  showItemEndpoint: YTShowLiveChatItemEndpointContainer<YTLiveChatPaidMessageRendererContainer>;
  authorExternalChannelId: string;
  fullDurationSec: number;
  trackingParams: string;
}

export interface YTLiveChatTickerPaidStickerItemRenderer {
  id: string;
  authorPhoto: YTTickerThumbnailClass;
  startBackgroundColor: number;
  endBackgroundColor: number;
  durationSec: number;
  fullDurationSec: number;
  showItemEndpoint: YTShowLiveChatItemEndpointContainer<YTLiveChatPaidStickerRendererContainer>;
  authorExternalChannelId: string;
  tickerThumbnails: YTTickerThumbnailClass[];
  trackingParams: string;
}

export interface YTLiveChatTickerSponsorItemRenderer {
  id: string;
  detailText: YTRunContainer;
  detailTextColor: number;
  startBackgroundColor: number;
  endBackgroundColor: number;
  sponsorPhoto: YTThumbnails;
  durationSec: number;
  showItemEndpoint: YTShowLiveChatItemEndpointContainer<YTLiveChatMembershipItemRendererContainer>;
  authorExternalChannelId: string;
  fullDurationSec: number;
}

// Misc

export interface YTShowLiveChatItemEndpointContainer<T> {
  clickTrackingParams: string;
  commandMetadata: YTCommandMetadata;
  showLiveChatItemEndpoint: YTRendererContainer<T>;
}

export interface YTRendererContainer<T> {
  renderer: T;
  trackingParams: string;
}

export interface YTActionPanel {
  liveChatMessageInputRenderer: {
    inputField: YTInputField;
    sendButton: YTSendButton;
    pickers: YTPicker[];
    pickerButtons: YTPickerButton[];
    interactionMessage: YTInteractionMessage;
  };
}

export interface YTInputField {
  liveChatTextInputFieldRenderer: {
    placeholder: YTRunContainer;
    maxCharacterLimit: number;
    emojiCharacterCount: number;
  };
}

export interface YTInteractionMessage {
  messageRenderer: {
    trackingParams: string;
    button: YTSigninButtonRendererContainer;
    subtext: YTSubtext;
  };
}

export interface YTAuthorBadge {
  liveChatAuthorBadgeRenderer: {
    customThumbnail?: YTCustomThumbnail;
    icon?: YTIcon;
    tooltip: string;
    accessibility: YTAccessibilityData;
  };
}

export interface YTCustomThumbnail {
  thumbnails: YTPopoutLiveChatEndpoint[];
}

export interface YTPopoutLiveChatEndpoint {
  url: string;
}

export interface YTSignInEndpointContainer {
  signInEndpoint: YTSignInEndpoint;
  commandMetadata: YTCommandMetadata;
  clickTrackingParams: string;
}

export interface YTWatchEndpointContainer {
  watchEndpoint: YTWatchEndpoint;
  clickTrackingParams: string;
  commandMetadata: YTIgnoreCommandMetadata;
}

export interface YTSignInEndpoint {
  nextEndpoint: YTWatchEndpointContainer;
}

export interface YTWatchEndpoint {
  videoId: string;
}

export interface YTIgnoreCommandMetadata {
  webCommandMetadata: YTIgnoreWebCommandMetadata;
}

export interface YTCommandMetadata {
  webCommandMetadata: YTWebCommandMetadata;
}

export interface YTIgnoreWebCommandMetadata {
  ignoreNavigation: boolean;
}

export interface YTWebCommandMetadata {
  url: string;
  webPageType: YTWebPageType | string;
  rootVe: number;
}

export enum YTWebPageType {
  Unknown = "WEB_PAGE_TYPE_UNKNOWN",
}

export interface YTSimpleText {
  simpleText: string;
}

export interface YTSubtext {
  messageSubtextRenderer: {
    text: YTSimpleText;
  };
}

export interface YTIcon {
  iconType: YTIconType | string;
}

export enum YTIconType {
  Keep = "KEEP",
}

export interface YTPicker {
  emojiPickerRenderer: EmojiPickerRenderer;
}

export interface EmojiPickerRenderer {
  id: string;
  categories: YTEmojiCategory[];
  categoryButtons: YTCategoryButton[];
  searchPlaceholderText: YTRunContainer;
  searchNoResultsText: YTRunContainer;
  pickSkinToneText: YTRunContainer;
  trackingParams: string;
  clearSearchLabel: string;
  skinToneGenericLabel: string;
  skinToneLightLabel: string;
  skinToneMediumLightLabel: string;
  skinToneMediumLabel: string;
  skinToneMediumDarkLabel: string;
  skinToneDarkLabel: string;
}

export interface YTEmojiCategory {
  emojiPickerCategoryRenderer: {
    categoryId: string;
    title: YTSimpleText;
    emojiIds: string[];
    trackingParams: string;
  };
}

export interface YTLiveChatAuthorBadgeRendererContainer {
  liveChatAuthorBadgeRenderer: YTIconButtonRenderer;
}

export interface YTThumbnails {
  thumbnails: YTThumbnail[];
}

export interface YTThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YTLiveChatBannerRendererHeader {
  liveChatBannerHeaderRenderer: {
    icon: YTIcon;
    text: YTRunContainer;
    contextMenuButton: YTCommandButtonRendererContainer;
  };
}

export interface YTButtonRendererServiceEndpoint {
  clickTrackingParams: string;
  popoutLiveChatEndpoint: YTPopoutLiveChatEndpoint;
}

export interface YTAcceptCommandCommandMetadata {
  webCommandMetadata: YTTentacledWebCommandMetadata;
}

export interface YTTentacledWebCommandMetadata {
  sendPost: boolean;
  apiUrl: string;
}

export interface YTCommandButtonRendererContainer<
  Command = YTLiveChatItemContextMenuEndpointContainer
> {
  buttonRenderer: {
    icon: YTIcon;
    style?: string;
    command?: Command;
    accessibilityData: YTAccessibilityData;
    trackingParams: string;
  };
}

export interface YTFluffyButton {
  buttonRenderer: {
    text: YTRunContainer;
    style: string;
    serviceEndpoint: YTButtonRendererServiceEndpoint;
    trackingParams: string;
  };
}

export interface YTButtonRenderer {
  size: string;
  style: string;
  isDisabled: boolean;
  accessibility: YTAccessibilityLabel;
  trackingParams: string;
}

export interface YTTextButtonRenderer<Endpoint> extends YTButtonRenderer {
  text: YTSimpleText;
  navigationEndpoint: Endpoint;
}

export interface YTIconButtonRenderer {
  icon: YTIcon;
  tooltip: string;
  categoryId?: string;
  accessibility: YTAccessibilityData;
}

export interface YTIconToggleButtonRenderer {
  icon: YTIcon;
  tooltip: string;
  toggledIcon: YTIcon;
  targetId: string;
  accessibility: YTAccessibilityData;
  trackingParams: string;
}

export interface YTSendButton {
  buttonRenderer: {
    icon: YTIcon;
    accessibility: YTAccessibilityLabel;
    trackingParams: string;
  };
}

export interface YTSigninButtonRendererContainer {
  buttonRenderer: YTTextButtonRenderer<YTSignInEndpointContainer>;
}

export interface YTActionButtonRendererContainer {
  buttonRenderer: YTTextButtonRenderer<YTUrlEndpointContainer> & {
    accessibilityData: YTAccessibilityData;
  };
}

export interface CollapseButton {
  buttonRenderer: YTButtonRenderer;
}

export interface YTPickerButton {
  liveChatIconToggleButtonRenderer: YTIconToggleButtonRenderer;
}

export interface YTCategoryButton {
  emojiPickerCategoryButtonRenderer: YTIconButtonRenderer;
}

export interface YTMenuNavigationItemRendererServiceEndpointContainer {
  showLiveChatParticipantsEndpoint?: YTSEndpoint;
  toggleLiveChatTimestampsEndpoint?: YTSEndpoint;
  popoutLiveChatEndpoint?: YTPopoutLiveChatEndpoint;
  clickTrackingParams: string;
}

export interface YTLiveChatItemContextMenuEndpointContainer {
  liveChatItemContextMenuEndpoint: YTLiveChatItemContextMenuEndpoint;
  commandMetadata: YTIgnoreCommandMetadata;
  clickTrackingParams: string;
}

export interface YTFeedbackEndpointContainer {
  commandMetadata: YTAcceptCommandCommandMetadata;
  feedbackEndpoint: YTFeedbackEndpoint;
  clickTrackingParams: string;
}

export interface YTUserFeedbackEndpointContainer {
  userFeedbackEndpoint: YTUserFeedbackEndpoint;
  commandMetadata: YTIgnoreCommandMetadata;
  clickTrackingParams: string;
}

export interface YTUserFeedbackEndpoint {
  hack: boolean;
  bucketIdentifier: string;
}

export interface YTSEndpoint {
  hack: boolean;
}

export interface YTLiveChatItemContextMenuEndpoint {
  params: string;
}

export interface YTFeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
}

export interface YTTickerThumbnailClass {
  thumbnails: YTThumbnail[];
  accessibility: YTAccessibilityData;
}

export interface YTShowLiveChatTooltipCommand {
  tooltip: YTTooltipRendererContainer;
}

export interface YTType {
  type: string;
}

export interface YTPromoConfig {
  promoId: string;
  impressionEndpoints: YTFeedbackEndpointContainer[];
  acceptCommand: YTFeedbackEndpointContainer;
  dismissCommand: YTFeedbackEndpointContainer;
}

export interface UIActions {
  hideEnclosingContainer: boolean;
}

export interface YTClientMessages {
  reconnectMessage: YTRunContainer;
  unableToReconnectMessage: YTRunContainer;
  fatalError: YTRunContainer;
  reconnectedMessage: YTRunContainer;
  genericError: YTRunContainer;
}

export interface YTLiveChatContinuationHeader {
  liveChatHeaderRenderer: {
    overflowMenu: YTOverflowMenu;
    collapseButton: CollapseButton;
    viewSelector: YTViewSelector;
  };
}

export interface YTOverflowMenu {
  menuRenderer: {
    items: YTMenuItemElement[];
    trackingParams: string;
    accessibility: YTAccessibilityData;
  };
}

export interface YTMenuItemElement {
  menuServiceItemRenderer?: YTMenuItemRenderer;
  menuNavigationItemRenderer?: YTMenuItemRenderer;
}

export interface YTMenuItemRenderer {
  icon: YTIcon;
  text: YTRunContainer;
  navigationEndpoint?: YTUserFeedbackEndpointContainer;
  trackingParams: string;
  serviceEndpoint?: YTMenuNavigationItemRendererServiceEndpointContainer;
}

export interface YTViewSelector {
  sortFilterSubMenuRenderer: {
    subMenuItems: YTSubMenuItem[];
    accessibility: YTAccessibilityData;
    trackingParams: string;
  };
}

export interface YTSubMenuItem {
  title: string;
  subtitle: string;
  continuation: YTReloadContinuation;
  selected: boolean;
  accessibility: YTAccessibilityData;
}

export interface YTItemList {
  liveChatItemListRenderer: {
    maxItemsToDisplay: number;
    moreCommentsBelowButton: YTCommandButtonRendererContainer;
    enablePauseChatKeyboardShortcuts: boolean;
  };
}

export interface YTParticipantsList {
  liveChatParticipantsListRenderer: {
    title: YTRunContainer;
    backButton: YTCommandButtonRendererContainer;
    participants: YTParticipant[];
  };
}

export interface YTParticipant {
  liveChatParticipantRenderer: {
    authorName: YTSimpleText;
    authorPhoto: YTThumbnails;
    authorBadges: YTLiveChatAuthorBadgeRendererContainer[];
  };
}

export interface YTPopoutMessage {
  messageRenderer: {
    text: YTRunContainer;
    trackingParams: string;
    button: YTFluffyButton;
  };
}

export interface YTTicker {
  liveChatTickerRenderer: {
    sentinel: boolean;
  };
}
