﻿using System.Text.Json.Serialization;

namespace Project.Models.Models
{
    public class Record
    {
        // Primary key
        public Guid RecordId { get; set; }

        // Foreign keys
        public Guid ResidenceId { get; set; }
        public Guid? PersonId { get; set; }

        // Properties
        public string Action { get; set; }
        public string OwnerRelationship { get; set; }
        public DateTime DateCreated { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual Person? Person { get; set; }
        [JsonIgnore]
        public virtual Residence Residence { get; set; }
    }
}
