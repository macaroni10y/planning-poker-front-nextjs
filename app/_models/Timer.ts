import type {
	DocumentData,
	FirestoreDataConverter,
	PartialWithFieldValue,
	QueryDocumentSnapshot,
	SnapshotOptions,
	WithFieldValue,
} from "@firebase/firestore";
import * as v from "valibot";

export const operationTypeSchema = v.union([
	v.literal("pause"),
	v.literal("resume"),
	v.literal("reset"),
]);

export type OperationType = v.InferOutput<typeof operationTypeSchema>;

export const timerSchema = v.object({
	id: v.string(),
	roomId: v.string(),
	/**
	 * timestamp when timer was started
	 */
	time: v.number(),
	operationType: operationTypeSchema,
});

export type Timer = v.InferOutput<typeof timerSchema>;

export const timerConverter: FirestoreDataConverter<Timer> = {
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions | undefined,
	): Timer {
		return v.parse(timerSchema, {
			id: snapshot.id,
			...snapshot.data(options),
		});
	},
	toFirestore(
		modelObject: WithFieldValue<Timer> | PartialWithFieldValue<Timer>,
	): DocumentData {
		const { id, ...rest } = modelObject;
		return rest;
	},
};
