export interface Feedback {
    feedbackUid: string;
    rating: number;
    message?: string;
    createdAt?:  Date;
}
export interface FeedbackDTO {
    uid: string;
    feedbacks: Feedback[]
}