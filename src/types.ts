export interface NavigationContractItem {
  readonly href: string;
  readonly id: string;
  readonly label: string;
}

export interface NavigationSiteSettings {
  readonly repository: string;
  readonly repositoryLabel: string;
}

export interface CurrentSectionRule {
  readonly site: string;
  readonly pathPrefix: string;
  readonly current: string;
}

export interface ChangeLocation {
  readonly repository: string;
  readonly paths: readonly string[];
}

export interface NavigationContract {
  readonly formatVersion: number;
  readonly contractVersion: string;
  readonly status: string;
  readonly siteSettings: Readonly<Record<string, NavigationSiteSettings>>;
  readonly items: readonly NavigationContractItem[];
  readonly currentSectionRules: readonly CurrentSectionRule[];
  readonly changeLocations: readonly ChangeLocation[];
  readonly qualityChecks: readonly string[];
  readonly publicationGate: readonly string[];
}

export interface SiteNavigationOptions {
  readonly site: string;
  readonly pathname: string;
}

export interface SiteHeaderOptions extends SiteNavigationOptions {
  readonly assetBase?: string;
}
