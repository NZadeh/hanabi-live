// The schema in this file corresponds to "database_schema.sql".

import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  normalizedUsername: text("normalized_username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  lastIP: text("last_ip").notNull(),
  datetimeCreated: timestamp("datetime_created", { withTimezone: true })
    .notNull()
    .defaultNow(),
  datetimeLastLogin: timestamp("datetime_last_login", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userSettingsTable = pgTable("user_settings", {
  userID: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  desktopNotification: boolean("desktop_notification").notNull().default(false),
  soundMove: boolean("sound_move").notNull().default(true),
  soundTimer: boolean("sound_timer").notNull().default(true),
  keldonMode: boolean("keldon_mode").notNull().default(false),
  colorblindMode: boolean("colorblind_mode").notNull().default(false),
  realLifeMode: boolean("real_life_mode").notNull().default(false),
  reverseHands: boolean("reverse_hands").notNull().default(false),
  styleNumbers: boolean("style_numbers").notNull().default(false),
  showTimerInUntimed: boolean("show_timer_in_untimed").notNull().default(false),
  speedrunPreplay: boolean("speedrun_preplay").notNull().default(false),
  speedrunMode: boolean("speedrun_mode").notNull().default(false),
  hyphenatedConventions: boolean("hyphenated_conventions")
    .notNull()
    .default(false),
  volume: smallint("volume").notNull().default(50),
  createTableVariant: text("create_table_variant")
    .notNull()
    .default("No Variant"),
  createTableTimed: boolean("create_table_timed").notNull().default(false),
  createTableTimeBaseMinutes: doublePrecision("create_table_time_base_minutes")
    .notNull()
    .default(2),
  createTableTimePerTurnSeconds: integer("create_table_time_per_turn_seconds")
    .notNull()
    .default(20),
  createTableSpeedrun: boolean("create_table_speedrun")
    .notNull()
    .default(false),
  createTableCardCycle: boolean("create_table_card_cycle")
    .notNull()
    .default(false),
  createTableDeckPlays: boolean("create_table_deck_plays")
    .notNull()
    .default(false),
  createTableEmptyClues: boolean("create_table_empty_clues")
    .notNull()
    .default(false),
  createTableOneExtraCard: boolean("create_table_one_extra_card")
    .notNull()
    .default(false),
  createTableOneLessCard: boolean("create_table_one_less_card")
    .notNull()
    .default(false),
  createTableAllOrNothing: boolean("create_table_all_or_nothing")
    .notNull()
    .default(false),
  createTableDetrimentalCharacters: boolean(
    "create_table_detrimental_characters",
  )
    .notNull()
    .default(false),
  createTableMaxPlayers: smallint("create_table_max_players")
    .notNull()
    .default(5),
});

// TODO: user_stats

export const userFriendsTable = pgTable("user_friends", {
  userID: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  friendID: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export const userReverseFriendsTable = pgTable("user_reverse_friends", {
  userID: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  friendID: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
});

// TODO: games

// TODO: game_participants

// TODO: game_participant_notes

// TODO: game_actions

// TODO: game_tags

// TODO: variant_stats

export const chatLogTable = pgTable(
  "chat_log",
  {
    id: serial("id").primaryKey(),
    userID: integer("user_id").notNull(),
    discordName: text("discord_name"),
    message: text("message").notNull(),
    room: text("room").notNull(),
    username: text("username").notNull().unique(),
    normalizedUsername: text("normalized_username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    lastIP: text("last_ip").notNull(),
    datetimeSent: timestamp("datetime_sent", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    chatLogIndexUserID: index("chat_log_index_user_id").on(table.userID),
    chatLogIndexRoom: index("chat_log_index_room").on(table.room),
    chatLogDatetimeSentID: index("chat_log_datetime_sent_id").on(
      table.datetimeSent,
      table.id,
    ),
  }),
);

export const chatLogPMTable = pgTable(
  "chat_log_pm",
  {
    id: serial("id").primaryKey(),
    userID: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    message: text("message").notNull(),
    recipientID: integer("recipient_id").notNull(),
    datetimeSent: timestamp("datetime_sent", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    chatLogPMIndexUserID: index("chat_log_pm_index_user_id").on(table.userID),
    chatLogPMIndexRecipientID: index("chat_log_pm_index_recipient_id").on(
      table.recipientID,
    ),
    chatLogPMIndexDatetimeSentID: index(
      "chat_log_pm_index_datetime_sent_id",
    ).on(table.datetimeSent, table.id),
  }),
);

export const bannedIPsTable = pgTable("banned_ips", {
  id: serial("id").primaryKey(),
  ip: text("ip").notNull().unique(),

  /** `DEFAULT NULL` is the default behavior. */
  userID: integer("user_id").references(() => usersTable.id),

  /** `DEFAULT NULL` is the default behavior. */
  reason: text("reason"),

  datetimeBanned: timestamp("datetime_banned", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const mutedIPsTable = pgTable("muted_ips", {
  id: serial("id").primaryKey(),
  ip: text("ip").notNull().unique(),

  /** `DEFAULT NULL` is the default behavior. */
  userID: integer("user_id").references(() => usersTable.id),

  /** `DEFAULT NULL` is the default behavior. */
  reason: text("reason"),

  datetimeBanned: timestamp("datetime_banned", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
