export interface Statistics {
    users: {
        total: number;
        last_30_days: number;
        label_id: string;
    };
    recommendationRequests: {
        total: number;
        last_7_days: number;
        label_id: string;
    };
    recommendationWithLetter: {
        total: number;
        last_7_days: number;
        label_id: string;
    };
    pageView: {
        total: number;
        last_1_day: number;
        label_id: string;
    };
}

export interface PageViewBrowser {
    chrome: number;
    firefox: number;
    safari: number;
    edge: number;
    opera: number;
    ie: number;
    others: number;
}
