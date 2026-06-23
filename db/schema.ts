import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
};

export const adminUsers = sqliteTable("admin_users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role", { enum: ["owner", "manager", "editor"] }).notNull(),
  passwordHash: text("password_hash"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastLoginAt: text("last_login_at"),
  ...timestamps,
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  valueType: text("value_type", { enum: ["string", "number", "boolean", "json"] })
    .notNull()
    .default("string"),
  updatedBy: text("updated_by").references(() => adminUsers.id),
  updatedAt: text("updated_at").notNull(),
});

export const mediaAssets = sqliteTable("media_assets", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  alt: text("alt"),
  mimeType: text("mime_type"),
  width: integer("width"),
  height: integer("height"),
  uploadedBy: text("uploaded_by").references(() => adminUsers.id),
  ...timestamps,
});

export const products = sqliteTable(
  "products",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    subtitle: text("subtitle"),
    description: text("description"),
    status: text("status", { enum: ["draft", "active", "archived"] }).notNull(),
    category: text("category"),
    heroImageUrl: text("hero_image_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => ({
    statusIdx: index("products_status_idx").on(table.status),
    categoryIdx: index("products_category_idx").on(table.category),
  })
);

export const productVariants = sqliteTable(
  "product_variants",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    sku: text("sku").notNull().unique(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    compareAtPrice: integer("compare_at_price"),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    ...timestamps,
  },
  (table) => ({
    productIdx: index("product_variants_product_idx").on(table.productId),
  })
);

export const campaigns = sqliteTable(
  "campaigns",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    bannerImageUrl: text("banner_image_url"),
    startsAt: text("starts_at"),
    endsAt: text("ends_at"),
    status: text("status", { enum: ["draft", "scheduled", "active", "ended"] }).notNull(),
    discountType: text("discount_type", { enum: ["none", "percent", "amount", "free_shipping"] })
      .notNull()
      .default("none"),
    discountValue: real("discount_value"),
    ruleJson: text("rule_json").notNull().default("{}"),
    ...timestamps,
  },
  (table) => ({
    statusIdx: index("campaigns_status_idx").on(table.status),
    timeIdx: index("campaigns_time_idx").on(table.startsAt, table.endsAt),
  })
);

export const members = sqliteTable(
  "members",
  {
    id: text("id").primaryKey(),
    email: text("email").unique(),
    phone: text("phone").unique(),
    displayName: text("display_name"),
    status: text("status", { enum: ["pending", "active", "suspended"] }).notNull(),
    tier: text("tier").notNull().default("basic"),
    birthday: text("birthday"),
    points: integer("points").notNull().default(0),
    acceptsMarketing: integer("accepts_marketing", { mode: "boolean" }).notNull().default(false),
    lastLoginAt: text("last_login_at"),
    ...timestamps,
  },
  (table) => ({
    statusIdx: index("members_status_idx").on(table.status),
    tierIdx: index("members_tier_idx").on(table.tier),
  })
);

export const memberIdentities = sqliteTable(
  "member_identities",
  {
    id: text("id").primaryKey(),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id),
    provider: text("provider", { enum: ["email", "line"] }).notNull(),
    providerUserId: text("provider_user_id").notNull(),
    profileJson: text("profile_json").notNull().default("{}"),
    ...timestamps,
  },
  (table) => ({
    providerIdx: index("member_identities_provider_idx").on(table.provider, table.providerUserId),
    memberIdx: index("member_identities_member_idx").on(table.memberId),
  })
);

export const carts = sqliteTable(
  "carts",
  {
    id: text("id").primaryKey(),
    memberId: text("member_id").references(() => members.id),
    status: text("status", { enum: ["open", "converted", "abandoned"] }).notNull(),
    currency: text("currency").notNull().default("TWD"),
    subtotal: integer("subtotal").notNull().default(0),
    discountTotal: integer("discount_total").notNull().default(0),
    total: integer("total").notNull().default(0),
    ...timestamps,
  },
  (table) => ({
    memberIdx: index("carts_member_idx").on(table.memberId),
  })
);

export const cartItems = sqliteTable(
  "cart_items",
  {
    id: text("id").primaryKey(),
    cartId: text("cart_id")
      .notNull()
      .references(() => carts.id),
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    variantId: text("variant_id").references(() => productVariants.id),
    quantity: integer("quantity").notNull(),
    unitPrice: integer("unit_price").notNull(),
    lineTotal: integer("line_total").notNull(),
    ...timestamps,
  },
  (table) => ({
    cartIdx: index("cart_items_cart_idx").on(table.cartId),
  })
);

export const orders = sqliteTable(
  "orders",
  {
    id: text("id").primaryKey(),
    orderNumber: text("order_number").notNull().unique(),
    memberId: text("member_id").references(() => members.id),
    status: text("status", {
      enum: ["draft", "pending_payment", "paid", "fulfilled", "cancelled", "refunded"],
    }).notNull(),
    currency: text("currency").notNull().default("TWD"),
    subtotal: integer("subtotal").notNull(),
    discountTotal: integer("discount_total").notNull().default(0),
    shippingTotal: integer("shipping_total").notNull().default(0),
    total: integer("total").notNull(),
    customerJson: text("customer_json").notNull().default("{}"),
    shippingJson: text("shipping_json").notNull().default("{}"),
    note: text("note"),
    paidAt: text("paid_at"),
    ...timestamps,
  },
  (table) => ({
    memberIdx: index("orders_member_idx").on(table.memberId),
    statusIdx: index("orders_status_idx").on(table.status),
  })
);

export const orderItems = sqliteTable(
  "order_items",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => orders.id),
    productId: text("product_id").references(() => products.id),
    variantId: text("variant_id").references(() => productVariants.id),
    sku: text("sku"),
    name: text("name").notNull(),
    quantity: integer("quantity").notNull(),
    unitPrice: integer("unit_price").notNull(),
    lineTotal: integer("line_total").notNull(),
    ...timestamps,
  },
  (table) => ({
    orderIdx: index("order_items_order_idx").on(table.orderId),
  })
);

export const payments = sqliteTable(
  "payments",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => orders.id),
    provider: text("provider", { enum: ["ecpay"] }).notNull(),
    providerMerchantTradeNo: text("provider_merchant_trade_no").notNull().unique(),
    amount: integer("amount").notNull(),
    status: text("status", { enum: ["created", "pending", "paid", "failed", "refunded"] }).notNull(),
    requestJson: text("request_json").notNull().default("{}"),
    responseJson: text("response_json").notNull().default("{}"),
    paidAt: text("paid_at"),
    ...timestamps,
  },
  (table) => ({
    orderIdx: index("payments_order_idx").on(table.orderId),
    statusIdx: index("payments_status_idx").on(table.status),
  })
);

export const lineBindings = sqliteTable(
  "line_bindings",
  {
    id: text("id").primaryKey(),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id),
    lineUserId: text("line_user_id").notNull().unique(),
    displayName: text("display_name"),
    pictureUrl: text("picture_url"),
    isFriend: integer("is_friend", { mode: "boolean" }).notNull().default(false),
    linkedAt: text("linked_at").notNull(),
    ...timestamps,
  },
  (table) => ({
    memberIdx: index("line_bindings_member_idx").on(table.memberId),
  })
);

export const integrationSettings = sqliteTable("integration_settings", {
  provider: text("provider", { enum: ["ecpay", "line_login", "line_messaging"] }).primaryKey(),
  isEnabled: integer("is_enabled", { mode: "boolean" }).notNull().default(false),
  publicConfigJson: text("public_config_json").notNull().default("{}"),
  secretRefJson: text("secret_ref_json").notNull().default("{}"),
  updatedBy: text("updated_by").references(() => adminUsers.id),
  updatedAt: text("updated_at").notNull(),
});

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorAdminId: text("actor_admin_id").references(() => adminUsers.id),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    metadataJson: text("metadata_json").notNull().default("{}"),
    createdAt: text("created_at").notNull(),
  },
  (table) => ({
    entityIdx: index("audit_logs_entity_idx").on(table.entityType, table.entityId),
  })
);
