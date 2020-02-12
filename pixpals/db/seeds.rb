# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

items = Item.create(
  [
    {name: 'Wizard Robe', cost: 1000, image: '/images/outfits/robe_green.png' }, 
    {name: 'Casual Outfit', cost: 150, image: '/images/outfits/casual_pink.png' }, 
    {name: 'Modern Vampire', cost: 500, image: '/images/outfits/vamp_purple.png'},
    {name: 'Pippy Longstocking', cost: 900, image: '/images/hairstyles/pippy_red.png'},
    {name: 'Buzzcut', cost: 50, image: '/images/hairstyles/buzz_yellow.png'},
    {name: 'Low Bun', cost: 350, image: '/images/hairstyles/bun_green.png'}
  ]
)

