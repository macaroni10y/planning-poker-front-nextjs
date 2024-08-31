import type {
	FirestoreDataConverter,
	PartialWithFieldValue,
	QueryDocumentSnapshot,
	SetOptions,
	SnapshotOptions,
	WithFieldValue,
} from "@firebase/firestore";
import * as v from "valibot";

const countableVoteValueSchema = v.union([
	v.literal(0.5),
	v.literal(1),
	v.literal(2),
	v.literal(3),
	v.literal(5),
	v.literal(8),
	v.literal(13),
	v.literal(20),
	v.literal(40),
	v.literal(100),
]);
type CountableVoteValue = v.InferOutput<typeof countableVoteValueSchema>;

const votableVoteValueSchema = v.union([
	countableVoteValueSchema,
	v.literal("skip"),
]);
type VotableVoteValue = v.InferOutput<typeof votableVoteValueSchema>;

const notVotableVoteValueSchema = v.union([v.literal("not yet")]);

const voteValueSchema = v.union([
	votableVoteValueSchema,
	notVotableVoteValueSchema,
]);
type VoteValue = v.InferOutput<typeof voteValueSchema>;

export const vote2Schema = v.object({
	id: v.string(),
	roomId: v.string(),
	userId: v.string(),
	userName: v.string(),
	value: voteValueSchema,
});

export type Vote2 = v.InferOutput<typeof vote2Schema>;

export const vote2Converter: FirestoreDataConverter<Vote2> = {
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions | undefined,
	): Vote2 {
		return v.parse(vote2Schema, {
			id: snapshot.id,
			...snapshot.data(options),
		});
	},
	toFirestore(
		modelObject: WithFieldValue<Vote2> | PartialWithFieldValue<Vote2>,
		options?: SetOptions,
	) {
		const { id, ...rest } = modelObject;
		return rest;
	},
};
