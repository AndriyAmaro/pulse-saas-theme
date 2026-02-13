/**
 * Pulse Design System - Patterns
 * Composite components (molecules)
 *
 * 15 molecule components that combine primitives
 */

// FormField
export { FormField, formFieldVariants, labelVariants } from './FormField'
export type { FormFieldProps } from './FormField'

// SearchBar
export { SearchBar, searchBarVariants } from './SearchBar'
export type { SearchBarProps } from './SearchBar'

// Pagination
export { Pagination, paginationVariants, paginationItemVariants } from './Pagination'
export type { PaginationProps } from './Pagination'

// Breadcrumbs
export { Breadcrumbs, breadcrumbsVariants, breadcrumbItemVariants } from './Breadcrumbs'
export type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs'

// Tabs
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from './Tabs'
export type { TabsProps, TabsTriggerProps } from './Tabs'

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from './Accordion'
export type { AccordionProps, AccordionTriggerProps } from './Accordion'

// Alert
export { Alert, alertVariants, alertIconVariants } from './Alert'
export type { AlertProps } from './Alert'

// ProgressBar
export { ProgressBar, progressBarVariants, progressBarFillVariants } from './ProgressBar'
export type { ProgressBarProps } from './ProgressBar'

// StatCard
export { StatCard, statCardVariants, trendVariants } from './StatCard'
export type { StatCardProps } from './StatCard'

// EmptyState
export { EmptyState, emptyStateVariants, emptyStateIconVariants } from './EmptyState'
export type { EmptyStateProps } from './EmptyState'

// ErrorState
export { ErrorState, errorStateVariants, errorStateIconVariants } from './ErrorState'
export type { ErrorStateProps } from './ErrorState'

// Toast
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  toastVariants,
  toastViewportVariants,
} from './Toast'
export type { ToastProps, ToastViewportProps } from './Toast'

// Stepper
export { Stepper, stepperVariants, stepVariants, connectorVariants } from './Stepper'
export type { StepperProps, StepItem } from './Stepper'

// DatePicker
export { DatePicker, datePickerVariants, calendarVariants } from './DatePicker'
export type { DatePickerProps } from './DatePicker'

// FileUpload
export { FileUpload, fileUploadVariants, fileItemVariants } from './FileUpload'
export type { FileUploadProps, FileItem as UploadedFileItem } from './FileUpload'

// ActivityTimeline
export {
  ActivityTimeline,
  activityTimelineVariants,
  activityItemVariants,
  activityIconVariants,
  activityLineVariants,
} from './ActivityTimeline'
export type { ActivityTimelineProps, ActivityItem, ActivityType } from './ActivityTimeline'

// RatingStars
export { RatingStars, ratingStarsVariants } from './RatingStars'
export type { RatingStarsProps } from './RatingStars'

// RegionStats
export {
  RegionStats,
  regionStatsVariants,
  regionItemVariants,
  regionProgressBarVariants,
} from './RegionStats'
export type { RegionStatsProps, RegionItem } from './RegionStats'

// MiniCalendar
export { MiniCalendar, miniCalendarVariants, dayVariants } from './MiniCalendar'
export type { MiniCalendarProps, CalendarEvent } from './MiniCalendar'

// NotificationCenter
export {
  NotificationCenter,
  notificationCenterVariants,
  notificationItemVariants,
  notificationIconVariants,
} from './NotificationCenter'
export type {
  NotificationCenterProps,
  NotificationItem,
  NotificationType,
} from './NotificationCenter'

// ProductCard
export {
  ProductCard,
  productCardVariants,
  imageContainerVariants,
} from './ProductCard'
export type { ProductCardProps, ProductBadge } from './ProductCard'

// KanbanBoard
export {
  KanbanBoard,
  kanbanBoardVariants,
  kanbanColumnVariants,
  kanbanCardVariants,
  priorityBadgeVariants,
} from './KanbanBoard'
export type {
  KanbanBoardProps,
  KanbanColumn,
  KanbanCard,
  KanbanTag,
  KanbanAssignee,
  KanbanPriority,
} from './KanbanBoard'

// ChatUI
export {
  ChatContainer,
  ChatHeader,
  ChatMessagesList,
  ChatMessage,
  ChatInput,
  TypingIndicator,
  chatContainerVariants,
  chatMessageVariants,
  messageBubbleVariants,
  chatInputVariants,
  typingIndicatorVariants,
} from './ChatUI'
export type {
  ChatContainerProps,
  ChatMessageProps,
  ChatInputProps,
  TypingIndicatorProps,
  ChatMessageData,
  ChatUser,
  ChatAttachment,
  MessageStatus,
  MessagePosition,
} from './ChatUI'

// FileManager
export {
  FileManager,
  FileList,
  FileGrid,
  fileManagerVariants,
  fileManagerToolbarVariants,
  fileManagerBreadcrumbsVariants,
  fileListItemVariants,
  fileGridItemVariants,
} from './FileManager'
export type {
  FileManagerProps,
  FileItem,
  FileType,
  BreadcrumbItem as FileBreadcrumbItem,
  FileSortField,
  FileSortDirection,
  FileViewMode,
} from './FileManager'

// PricingTable
export {
  PricingTable,
  PricingCard,
  PricingToggle,
  pricingTableVariants,
  pricingCardVariants,
  pricingToggleVariants,
  toggleButtonVariants,
  featureItemVariants,
} from './PricingTable'
export type {
  PricingTableProps,
  PricingCardProps,
  PricingToggleProps,
  PricingPlan,
  PricingFeature,
  BillingPeriod,
} from './PricingTable'

// TestimonialCard
export {
  TestimonialCard,
  TestimonialGrid,
} from './TestimonialCard'
export type {
  TestimonialGridProps,
  Testimonial,
} from './TestimonialCard'

// OnboardingWizard
export {
  OnboardingWizard,
  StepsIndicator,
  wizardVariants,
  stepsIndicatorVariants,
  stepItemVariants,
  stepCircleVariants,
  wizardConnectorVariants,
  contentVariants,
} from './OnboardingWizard'
export type {
  OnboardingWizardProps,
  StepsIndicatorProps,
  WizardStep,
  StepStatus,
} from './OnboardingWizard'

// ============================================================================
// LANDING PAGE PATTERNS (BLOCO 2.7)
// ============================================================================

// HeroSection
export { HeroSection, heroVariants } from './HeroSection'
export type { HeroSectionProps } from './HeroSection'

// AbstractBackground
export { AbstractBackground } from './AbstractBackground'
export type { AbstractBackgroundProps } from './AbstractBackground'

// FeatureGrid
export {
  FeatureGrid,
  FeatureCard,
  featureGridVariants,
  featureCardVariants,
} from './FeatureGrid'
export type { FeatureGridProps, FeatureCardProps, FeatureItem } from './FeatureGrid'

// LogoCloud
export { LogoCloud, logoCloudVariants } from './LogoCloud'
export type { LogoCloudProps, LogoItem } from './LogoCloud'

// CTABanner
export { CTABanner, ctaBannerVariants } from './CTABanner'
export type { CTABannerProps } from './CTABanner'

// FAQAccordion
export { FAQAccordion, faqAccordionVariants, faqItemVariants } from './FAQAccordion'
export type { FAQAccordionProps, FAQItem, FAQCategory } from './FAQAccordion'

// FooterMarketing
export { FooterMarketing, footerMarketingVariants } from './FooterMarketing'
export type { FooterMarketingProps, FooterColumn, FooterLink, SocialLink, SocialPlatform } from './FooterMarketing'

// ============================================================================
// DASHBOARD ADVANCED PATTERNS (BLOCO 2.8)
// ============================================================================

// SparklineChart
export { SparklineChart, sparklineChartVariants } from './SparklineChart'
export type { SparklineChartProps, SparklineDataPoint } from './SparklineChart'

// GaugeChart
export { GaugeChart, gaugeChartVariants } from './GaugeChart'
export type { GaugeChartProps } from './GaugeChart'

// HeatmapCalendar
export { HeatmapCalendar, heatmapCalendarVariants } from './HeatmapCalendar'
export type { HeatmapCalendarProps, HeatmapDataPoint } from './HeatmapCalendar'

// LeaderboardList
export { LeaderboardList, leaderboardListVariants } from './LeaderboardList'
export type { LeaderboardListProps, LeaderboardItem } from './LeaderboardList'

// CountdownTimer
export { CountdownTimer, countdownTimerVariants } from './CountdownTimer'
export type { CountdownTimerProps } from './CountdownTimer'

// MetricCardAdvanced
export { MetricCardAdvanced, metricCardAdvancedVariants } from './MetricCardAdvanced'
export type { MetricCardAdvancedProps, MetricBreakdownItem } from './MetricCardAdvanced'

// ============================================================================
// UTILITY PATTERNS (BLOCO 2.9)
// ============================================================================

// ImageGallery
export {
  ImageGallery,
  ImageGallerySkeleton,
  imageGalleryVariants,
  thumbnailVariants,
  lightboxVariants,
  lightboxImageVariants,
  lightboxControlsVariants,
  thumbnailStripVariants,
} from './ImageGallery'
export type {
  ImageGalleryProps,
  ImageGallerySkeletonProps,
  GalleryImage,
} from './ImageGallery'

// VideoPlayer
export {
  VideoPlayer,
  videoPlayerVariants,
  videoControlsVariants,
  controlButtonVariants,
  progressBarVariants as videoProgressBarVariants,
  playlistVariants,
} from './VideoPlayer'
export type {
  VideoPlayerProps,
  VideoSource,
  VideoCaption,
  PlaylistItem,
} from './VideoPlayer'

// CodeBlock
export {
  CodeBlock,
  TerminalBlock,
  codeBlockVariants,
  codeHeaderVariants,
  codeContentVariants,
  lineVariants,
} from './CodeBlock'
export type {
  CodeBlockProps,
  TerminalBlockProps,
  CodeBlockLine,
  DiffType,
} from './CodeBlock'

// CookieConsent
export {
  CookieConsent,
  ManageCookiesButton,
  cookieConsentVariants,
  cookieButtonVariants,
  categoryToggleVariants,
} from './CookieConsent'
export type {
  CookieConsentProps,
  ManageCookiesButtonProps,
  CookieCategory,
  CookiePreferences,
} from './CookieConsent'

// BackToTop
export {
  BackToTop,
  backToTopVariants,
  progressRingVariants,
} from './BackToTop'
export type {
  BackToTopProps,
} from './BackToTop'

// ShareButtons
export {
  ShareButtons,
  shareButtonsVariants,
  shareButtonVariants,
} from './ShareButtons'
export type {
  ShareButtonsProps,
  ShareNetwork,
  ShareData,
} from './ShareButtons'

// ============================================================================
// AUTH PATTERNS
// ============================================================================

// PasswordInput
export { PasswordInput, defaultRequirements } from './PasswordInput'
export type { PasswordInputProps, PasswordRequirement } from './PasswordInput'

// SocialLoginButtons
export { SocialLoginButtons } from './SocialLoginButtons'
export type { SocialLoginButtonsProps, Provider as SocialProvider } from './SocialLoginButtons'

// AuthCard
export { AuthCard, AuthDivider, AuthLink } from './AuthCard'
export type { AuthCardProps } from './AuthCard'

// ============================================================================
// REAL ESTATE PATTERNS
// ============================================================================

// PropertyCard
export { PropertyCard, propertyCardVariants, statusBadgeVariants } from './PropertyCard'
export type { PropertyCardProps, PropertyStatus, PropertyType } from './PropertyCard'

// ============================================================================
// EDUCATION PATTERNS
// ============================================================================

// CourseCard
export { CourseCard, courseCardVariants, ProgressRing } from './CourseCard'
export type { CourseCardProps, CourseStatus, CourseCategory } from './CourseCard'

// CertificateCard
export { CertificateCard, certificateCardVariants } from './CertificateCard'
export type { CertificateCardProps } from './CertificateCard'

// AchievementBadge
export { AchievementBadge, AchievementGrid, achievementBadgeVariants } from './AchievementBadge'
export type { AchievementBadgeProps, AchievementGridProps, AchievementType, AchievementTier } from './AchievementBadge'

// ============================================================================
// CRYPTO TRADING PATTERNS
// ============================================================================

// CryptoCard
export { CryptoCard, cryptoCardVariants } from './CryptoCard'
export type { CryptoCardProps } from './CryptoCard'

// CandlestickChart
export { CandlestickChart, candlestickChartVariants } from './CandlestickChart'
export type { CandlestickChartProps, CandleData } from './CandlestickChart'

// PriceAlertCard
export { PriceAlertCard, priceAlertCardVariants, AlertItem } from './PriceAlertCard'
export type { PriceAlertCardProps, PriceAlert } from './PriceAlertCard'

// QuickTradeForm
export { QuickTradeForm, quickTradeFormVariants } from './QuickTradeForm'
export type { QuickTradeFormProps, CryptoOption } from './QuickTradeForm'

// ============================================================================
// RESTAURANT PATTERNS
// ============================================================================

// TableGrid
export { TableGrid, tableGridVariants, TableCard, statusConfig } from './TableGrid'
export type { TableGridProps, RestaurantTable, TableStatus } from './TableGrid'

// OrderTicket
export { OrderTicket, OrderTicketList, orderTicketVariants } from './OrderTicket'
export type { OrderTicketProps, KitchenOrder, OrderItem } from './OrderTicket'

// ReservationTimeline
export { ReservationTimeline, reservationTimelineVariants, ReservationItem } from './ReservationTimeline'
export type { ReservationTimelineProps, Reservation, ReservationStatus } from './ReservationTimeline'
