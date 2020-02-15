# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_15_132546) do

  create_table "avatars", force: :cascade do |t|
    t.string "base"
    t.string "hair"
    t.string "outfit"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.index ["user_id"], name: "index_avatars_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.string "created_by"
    t.integer "avatar_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["avatar_id"], name: "index_comments_on_avatar_id"
  end

  create_table "inventories", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_inventories_on_item_id"
    t.index ["user_id"], name: "index_inventories_on_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.integer "cost"
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.integer "currency"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "avatars", "users"
  add_foreign_key "comments", "avatars"
  add_foreign_key "inventories", "items"
  add_foreign_key "inventories", "users"
end
